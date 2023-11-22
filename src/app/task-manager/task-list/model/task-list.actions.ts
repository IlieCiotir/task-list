import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../task-service/task.service';

export const TaskListActions = createActionGroup({
  source: 'TaskList',
  events: {
    'Load Tasks List': emptyProps(),
    'Load Tasks List Success': props<{ data: Task[] }>(),
    'TaskList TaskLists Failure': props<{ error: unknown }>(),
    'Increment': emptyProps(),
    'Decrement': emptyProps(),
    'UpdateCounter': props<{ amount: number }>()
  }
});
