import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../task-service/task.service';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent implements OnInit {

  public taskForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', [Validators.minLength(5), Validators.required]],
    importance: ['normal'],
    dueDate: [new Date()] as [Date | string],
    done: [false],
  });

  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder, private activated: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.taskForm.valueChanges.subscribe(formValue => {
      if (formValue.title && formValue.title?.length < 5) {
        this.taskForm.controls.importance.setErrors({ importanceImportant: true })
      } else {
        this.taskForm.controls.importance.setErrors(null);
      }
    });

    const id = this.activated.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTask(id)
        .subscribe(task => {
          this.taskForm.setValue(task);
        })
    }
  }

  submit() {
    console.log(`submitted`, this.taskForm.value);
    this.taskForm.disable();

    if (this.taskForm.value.id) {
      this.taskService.updateTask(this.taskForm.value as Task)
        .subscribe({
          next: task => {
            console.log(`am creat`, task);
            this.router.navigate(['/tasks']);
            this.taskForm.enable();
          },
          error: (err) => alert('NU ESTE BACKEND!')
        });
    } else {
      this.taskService.createTask(<Task>this.taskForm.value)
        .subscribe({
          next: task => {
            console.log(`am creat`, task);
            this.router.navigate(['/tasks']);
            this.taskForm.enable();
          },
          error: (err) => alert('NU ESTE BACKEND!')
        });
    }

  }
}
