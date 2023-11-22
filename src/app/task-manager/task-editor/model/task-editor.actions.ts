import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../task-service/task.service';

export const TaskEditorActions = createActionGroup({
  source: 'TaskEditor',
  events: {
    'Load TaskEditors': props<{ id: string }>(),
    'Load TaskEditors Success': props<{ data: Task }>(),
    'Load TaskEditors Failure': props<{ error: unknown }>(),
    'Add Task': emptyProps(),
    'Save Task': props<{ task: Task }>(),
    'Save Task Success': props<{ task: Task }>(),
    'Save Task Failed': props<{ error: unknown }>()
  }
});
