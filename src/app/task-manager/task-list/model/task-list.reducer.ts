import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskListActions } from './task-list.actions';
import { Task } from '../../task-service/task.service';

export const taskListFeatureKey = 'taskList';

export interface TaskListState {
  taskList: Task[];
  counter: number;
}

export const initialState: TaskListState = {
  taskList: [],
  counter: 0
};

export const reducer = createReducer(
  initialState,
  on(TaskListActions.loadTasksList, state => state),
  on(TaskListActions.loadTasksListSuccess, (state, action) => ({
    ...state,
    taskList: action.data
  })),
  on(TaskListActions.taskListTaskListsFailure, (state, action) => state),

  on(TaskListActions.increment, (state) => ({
    ...state,
    counter: state.counter + 1
  })),
  on(TaskListActions.decrement, (state) => ({
    ...state,
    counter: state.counter - 1
  })),
  on(TaskListActions.updateCounter, (state, action) => ({
    ...state,
    counter: state.counter + action.amount
  }))
);

export const taskListFeature = createFeature({
  name: taskListFeatureKey,
  reducer,
});

