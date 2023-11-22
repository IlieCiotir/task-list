import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskService } from '../task-service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskEditorActions } from './model/task-editor.actions';
import { selectTaskEditorState } from './model/task-editor.selectors';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';


@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, NgrxFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss',
})
export class TaskEditorComponent {
  /// public task: Task = { id: '', description: '', title: '', dueDate: new Date(), done: false, importance: 'normal' }


  public taskForm?: FormGroupState<Task>;

  public counter = signal(0);

  public doubleCounter = computed(() => this.counter() * 2);

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store: Store) {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    //const task = this.taskService.tasks.find(task => task.id === id);
    if (id) {
      // this.taskForm.reset();
      //this.taskForm.patchValue(task);
      this.store.dispatch(TaskEditorActions.loadTaskEditors({ id }))
    } {
      this.store.dispatch(TaskEditorActions.addTask())
    }

    //this.taskForm.reset();
    this.store.select(selectTaskEditorState)
      .subscribe(({ task, loading, taskForm }) => {
        this.taskForm = taskForm;
      })

  }

  submitTask() {
    console.log(this.taskForm);

    this.store.dispatch(TaskEditorActions.saveTask({ task: this.taskForm?.value as Task }))

    //  this.router.navigate(['/task']);
    this.counter.set(5);
  }

  get subscribers() {
    return [];
  }

  addSubscriber() {
    // this.taskForm.controls.subscribers.controls.push(this.fb.control(''))
  }
}
