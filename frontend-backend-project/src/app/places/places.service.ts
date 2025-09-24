import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  error = signal<string | null>(null);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Failed to load available places'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Failed to load user places'
    ).pipe(
      tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (!prevPlaces.find((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put<{ userPlaces: Place[] }>(`http://localhost:3000/user-places`, {
        placeId: place.id,
      })
      .pipe(
        catchError(() => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to add place to user places.');

          return throwError(
            () => new Error('Failed to add place to user places')
          );
        })
      );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.find((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete<{ userPlaces: Place[] }>(
        `http://localhost:3000/user-places/${place.id}`
      )
      .pipe(
        catchError((errorRes) => {
          console.error('HTTP error occurred:', errorRes);

          this.userPlaces.set(prevPlaces);

          return throwError(
            () => new Error('Failed to remove place from user places')
          );
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((errorRes) => {
        console.error('HTTP error occurred:', errorRes);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
