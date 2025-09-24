import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { PlacesService } from '../places.service';
import { ErrorService } from '../../shared/error.service';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  standalone: true,
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isLoading = signal(false);

  private placesService = inject(PlacesService);
  private errorService = inject(ErrorService);
  private destroyRef = inject(DestroyRef);

  places = this.placesService.loadedUserPlaces;

  ngOnInit() {
    this.isLoading.set(true);
    const subscription = this.placesService.loadUserPlaces().subscribe({
      error: (err) => {
        console.error('Error loading user places:', err);
        this.errorService.showError('Failed to load user places');
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
    const subscription = this.placesService.removeUserPlace(place).subscribe({
      error: (err) => {
        console.error('Error deleting place:', err);
        this.errorService.showError(err.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
