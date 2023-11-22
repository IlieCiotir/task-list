import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTaskEditor from './task-editor.reducer';

export const selectTaskEditorState = createFeatureSelector<fromTaskEditor.TaskEditorState>(
  fromTaskEditor.taskEditorFeatureKey
);
