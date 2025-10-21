import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCounterFeature = createFeatureSelector<number>('counter');

export const selectCount = createSelector(selectCounterFeature, (count: number) => count);
export const selectDoubleCount = createSelector(selectCounterFeature, (count: number) => count * 2);
