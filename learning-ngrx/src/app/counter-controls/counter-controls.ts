import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { CounterState } from '../counter-store/counter.reducer';
import { CounterActions } from '../counter-store/counter.actions';

@Component({
  standalone: true,
  selector: 'app-counter-controls',
  imports: [],
  templateUrl: './counter-controls.html',
  styleUrl: './counter-controls.css',
})
export class CounterControls {
  counterStore = inject(Store<CounterState>);

  increment() {
    this.counterStore.dispatch<CounterActions>({ type: '[Counter] Increment', value: 10 });
  }

  decrement() {
    this.counterStore.dispatch<CounterActions>({ type: '[Counter] Decrement', value: 5 });
  }
}
