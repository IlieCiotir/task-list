import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTaskList from './task-list.reducer';

export const selectTaskListState = createFeatureSelector<fromTaskList.TaskListState>(
  fromTaskList.taskListFeatureKey
);

export const selectDoubleCount = createSelector(
  selectTaskListState,
  ({ counter }) => ({ cheatCounter: counter * 2 })
)

export const selectReallyCheatingCounter = createSelector(
  selectDoubleCount,
  ({ cheatCounter }) => ({ reallyCheatingCounter: cheatCounter * 10 })
)

export const selectAllCheats = createSelector(
  selectDoubleCount,
  selectReallyCheatingCounter,
  ({ cheatCounter }, { reallyCheatingCounter }) => cheatCounter * reallyCheatingCounter
)

export const selectTasks = createSelector(
  selectTaskListState,
  ({ taskList }) => taskList
)
