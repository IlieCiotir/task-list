import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TaskListActions } from './task-list.actions';
import { TaskService } from '../../task-service/task.service';


@Injectable()
export class TaskListEffects {

  taskListTaskLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TaskListActions.loadTasksList),
      concatMap(() =>
        this.taskService.loadTasks().pipe(
          map(data => TaskListActions.loadTasksListSuccess({ data })),
          catchError(error => of(TaskListActions.taskListTaskListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private taskService: TaskService) { }
}
