import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export const taskStoreFeatureKey = 'taskStore';

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};
function logState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.group(action.type);
    console.log(action);
    const newState = reducer(state, action);
    console.log(newState);
    console.groupEnd();
    return newState;
  };
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [logState] : [logState];
