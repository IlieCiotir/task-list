import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TaskEditorActions } from './task-editor.actions';
import { TaskService } from '../../task-service/task.service';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTaskEditorState } from './task-editor.selectors';
import { EnableAction } from 'ngrx-forms';


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
      concatMap(a => of(a).pipe(withLatestFrom(this.store.select(selectTaskEditorState)))),
      concatMap(([{ task }, { taskForm }]) => {
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
      tap(() => this.router.navigate(['/'])),
      map(() => new EnableAction('TASK_EDITOR_FORM'))
    )
  })

  constructor(private actions$: Actions, private taskService: TaskService, private router: Router, private store: Store) { }
}
