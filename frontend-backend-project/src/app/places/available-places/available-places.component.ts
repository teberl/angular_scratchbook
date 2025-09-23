import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  standalone: true,
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  error = signal<string | null>(null);
  isLoading = signal(false);
  private destroyRef = inject(DestroyRef);

  private httpClient = inject(HttpClient);

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places),
        catchError((errorRes) => {
          console.error('HTTP error occurred:', errorRes);
          return throwError(() => new Error('Failed to load places'));
        })
      )
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places.set(places);
          this.error.set(null);
        },
        error: (err: Error) => {
          console.error('Error loading places:', err);
          this.error.set('Failed to load places');
        },
        complete: () => {
          console.log('Request completed');
          this.isLoading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(place: Place) {
    this.httpClient
      .put(`http://localhost:3000/user-places`, { placeId: place.id })
      .subscribe({
        next: (userPlaces) => {
          console.log('User places updated:', userPlaces);
        },
        error: (err) => {
          console.error('Error updating user places:', err);
        },
      });
  }
}
