import { createReducer, on } from '@ngrx/store';

import { decrement, increment, set } from './counter.actions';

const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + (action.value ?? 1)),
  on(decrement, (state, action) => state - (action.value ?? 1)),
  on(set, (_state, action) => action.value)
);

export type CounterState = ReturnType<typeof counterReducer>;
