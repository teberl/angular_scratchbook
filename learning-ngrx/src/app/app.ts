import { Component, inject, OnInit, signal } from '@angular/core';

import { CounterControls } from './counter-controls/counter-controls';
import { CounterOutput } from './counter-output/counter-output';
import { Store } from '@ngrx/store';
import { CounterActions } from './counter-store/counter.actions';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CounterControls, CounterOutput],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('learning-ngrx');
  private counterStore = inject(Store<{ counter: number }>);

  ngOnInit() {
    this.counterStore.dispatch<CounterActions>({ type: '[Counter] Init' });
  }
}
