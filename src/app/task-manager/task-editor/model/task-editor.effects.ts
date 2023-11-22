import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TaskEditorActions } from './task-editor.actions';
import { TaskService } from '../../task-service/task.service';
import { Route, Router } from '@angular/router';


@Injectable()
export class TaskEditorEffects {

  loadTaskEditors$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TaskEditorActions.loadTaskEditors),
      concatMap(({ id }) =>
        this.taskService.get(id).pipe(
          map(data => TaskEditorActions.loadTaskEditorsSuccess({ data })),
          catchError(error => of(TaskEditorActions.loadTaskEditorsFailure({ error }))))
      )
    );
  });

  saveTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskEditorActions.saveTask),
      concatMap(({ task }) => {
        if (task.id) {
          return this.taskService.updateTask(task)
        } else {
          return this.taskService.createTask(task);
        }
      }),
      map(task => TaskEditorActions.saveTaskSuccess({ task })),
      catchError(error => of(TaskEditorActions.saveTaskFailed({ error })))
    )
  })

  saveSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskEditorActions.saveTaskSuccess),
      tap(() => this.router.navigate(['/']))
    )
  }, { dispatch: false })

  constructor(private actions$: Actions, private taskService: TaskService, private router: Router) { }
}
