import { Component, inject } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  standalone: true,
  selector: 'app-counter-controls',
  imports: [],
  templateUrl: './counter-controls.html',
  styleUrl: './counter-controls.css',
})
export class CounterControls {
  private counterService = inject(CounterService);

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }
}
