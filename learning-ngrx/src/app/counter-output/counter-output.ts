import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CounterService } from '../counter.service';

@Component({
  standalone: true,
  selector: 'app-counter-output',
  imports: [],
  templateUrl: './counter-output.html',
  styleUrl: './counter-output.css',
})
export class CounterOutput implements OnInit {
  counter = 0;
  counterServiceSub?: Subscription;

  private counterService = inject(CounterService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.counterServiceSub = this.counterService.counterChanged.subscribe(
      (newVal) => (this.counter = newVal)
    );

    this.destroyRef.onDestroy(() => {
      if (this.counterServiceSub) {
        this.counterServiceSub.unsubscribe();
      }
    });
  }
}
