import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskEditorActions } from './task-editor.actions';
import { Task } from '../../task-service/task.service';

export const taskEditorFeatureKey = 'taskEditor';

export interface TaskEditorState {
  task: Task;
  loading: boolean;
}

export const initialState: TaskEditorState = {
  task: {} as Task,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(TaskEditorActions.loadTaskEditors, state => ({ ...state, loading: true })),
  on(TaskEditorActions.loadTaskEditorsSuccess, (state, action) => ({
    ...state,
    task: action.data,
    loading: false
  })),
  on(TaskEditorActions.loadTaskEditorsFailure, (state, action) => ({ ...state, loading: false })),
  on(TaskEditorActions.addTask, (state) => ({
    ...state,
    task: {} as Task
  }))
);

export const taskEditorFeature = createFeature({
  name: taskEditorFeatureKey,
  reducer,
});

