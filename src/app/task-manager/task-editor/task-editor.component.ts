import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskService } from '../task-service/task.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

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
    dueDate: [new Date()],
    done: [false],
  });

  constructor(private taskService: TaskService, private router: Router, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.taskForm.valueChanges.subscribe(formValue => {
      if (formValue.title && formValue.title?.length < 5) {
        this.taskForm.controls.importance.setErrors({ importanceImportant: true })
      } else {
        this.taskForm.controls.importance.setErrors(null);
      }
    })


  }
  submit() {
    console.log(`submitted`, this.taskForm.value);
    this.taskForm.disable();
    setTimeout(() => {
      this.taskService.createTask(<Task>this.taskForm.value)
        .subscribe({
          next: task => {
            console.log(`am creat`, task);
            this.router.navigate(['/tasks']);
            this.taskForm.enable();
          },
          error: (err) => alert('NU ESTE BACKEND!')
        });
    }, 5000);

  }
}
