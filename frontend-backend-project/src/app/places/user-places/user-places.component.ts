import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  standalone: true,
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isLoading = signal(false);
  error = signal<string | null>(null);
  places = signal<Place[] | undefined>(undefined);

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => {
          console.log(places);
          this.places.set(places);
        },
        error: (err) => {
          console.error('Error loading user places:', err);
          this.error.set('Failed to load user places');
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

  onDeletePlace(place: Place) {
    this.httpClient
      .delete<{ userPlaces: Place[] }>(
        `http://localhost:3000/user-places/${place.id}`
      )
      .subscribe({
        next: (responseData) => {
          console.log('Place deleted:', responseData);
          this.places.set(responseData.userPlaces);
        },
        error: (err) => {
          console.error('Error deleting place:', err);
        },
      });
  }
}
