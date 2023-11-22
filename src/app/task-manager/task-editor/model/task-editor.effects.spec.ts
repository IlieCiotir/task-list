import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TaskEditorEffects } from './task-editor.effects';

describe('TaskEditorEffects', () => {
  let actions$: Observable<any>;
  let effects: TaskEditorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskEditorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TaskEditorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
