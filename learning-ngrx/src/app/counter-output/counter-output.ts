import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectCount,
  selectCounterFeature,
  selectDoubleCount,
} from '../counter-store/counter.selector';

@Component({
  standalone: true,
  selector: 'app-counter-output',
  imports: [AsyncPipe],
  templateUrl: './counter-output.html',
  styleUrl: './counter-output.css',
})
export class CounterOutput {
  counterStore = inject(Store<{ counter: number }>);

  test$: Observable<number>;
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor() {
    this.test$ = this.counterStore.select(selectCounterFeature);
    this.count$ = this.counterStore.select(selectCount);
    this.doubleCount$ = this.counterStore.select(selectDoubleCount);
  }
}
