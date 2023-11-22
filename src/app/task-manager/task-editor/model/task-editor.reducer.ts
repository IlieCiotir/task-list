import { createFeature, createReducer, on } from '@ngrx/store';
import { TaskEditorActions } from './task-editor.actions';
import { Task } from '../../task-service/task.service';
import { FormGroupState, MarkAsDirtyAction, SetValueAction, box, createFormGroupState, disable, onNgrxForms, onNgrxFormsAction, setErrors, setUserDefinedProperty, setValue, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { required, lessThan, minLength } from 'ngrx-forms/validation';

export const taskEditorFeatureKey = 'taskEditor';

export interface TaskEditorState {
  task: Task;
  loading: boolean;
  taskForm: FormGroupState<Task>
}

const initialTask = {
  id: '',
  description: '',
  title: '',
  done: false,
  dueDate: new Date().toISOString(),
  importance: 'normal'
} as Task;
export const initialState: TaskEditorState = {
  task: {} as Task,
  loading: false,
  taskForm: createFormGroupState<Task>('TASK_EDITOR_FORM', initialTask)
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(TaskEditorActions.loadTaskEditors, state => ({ ...state, loading: true, taskForm: disable(state.taskForm) })),
  on(TaskEditorActions.loadTaskEditorsSuccess, (state, action) => ({
    ...state,
    task: action.data,
    loading: false,
    taskForm: createFormGroupState('TASK_EDITOR_FORM', action.data)
  })),
  on(TaskEditorActions.loadTaskEditorsFailure, (state, action) => ({ ...state, loading: false })),
  on(TaskEditorActions.addTask, (state) => ({
    ...state,
    task: {} as Task,
   // taskForm: createFormGroupState('TASK_EDITOR_FORM', initialState)
  }))
);

const validatedFormReducer = wrapReducerWithFormStateUpdate(
  reducer,
  (state) => state.taskForm,
  (taskForm, state) => updateGroup<Task>({
    title: (title, taskForm) => {
      title = validate<string>([required, minLength(taskForm.value.description.length)])(title);
      if (taskForm.value.importance === 'high') {
        title = setValue(title.value.toUpperCase())(title)
      }
      return title
    },
    importance: (importance, taskForm) => {
      return setUserDefinedProperty('visible', !taskForm.value.done)(importance)
    }
  })(taskForm)
);

export const taskEditorFeature = createFeature({
  name: taskEditorFeatureKey,
  reducer: validatedFormReducer,
});

