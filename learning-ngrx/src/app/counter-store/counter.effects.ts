import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';

import { decrement, increment, init, set } from './counter.actions';
import { selectCount } from './counter.selector';

export class CounterEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<{ counter: number }>);

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCount = localStorage.getItem('counter');
        const count = storedCount ? parseInt(storedCount, 10) : 0;

        return of(set({ value: count }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, count]) => {
          console.log(action);
          localStorage.setItem('counter', count.toString());
        })
      ),
    {
      dispatch: false,
    }
  );
}
