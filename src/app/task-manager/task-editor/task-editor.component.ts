import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskService } from '../task-service/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {
  /// public task: Task = { id: '', description: '', title: '', dueDate: new Date(), done: false, importance: 'normal' }
  public taskForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.minLength(3)),
    done: new FormControl(false),
    dueDate: new FormControl<string | Date>(new Date()),
    importance: new FormControl('normal'),
    asignee: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email]
    }),
    subscribers: this.fb.array<string>([], Validators.minLength(1))
  })
  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const task = this.taskService.tasks.find(task => task.id === id);
    if (task) {
      this.taskForm.reset();
      this.taskForm.patchValue(task);
    }

  }

  submitTask() {
    console.log(this.taskForm);

    if (this.taskForm.value.id != '') {
      this.taskService.updateTask(this.taskForm.value as Task);
    } else {
      this.taskService.createTask(this.taskForm.value as Task);
    }

    this.router.navigate(['/task']);
  }
  get subscribers() {
    return this.taskForm.controls.subscribers;
  }

  addSubscriber() {
    this.taskForm.controls.subscribers.controls.push(this.fb.control(''))
  }
}
