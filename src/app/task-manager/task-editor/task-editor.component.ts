import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task-service/task.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {

  constructor(private taskService: TaskService, private router: Router) {

  }
  submit(task: Task) {
    console.log(`submitted`, task);
    this.taskService.createTask(task)
      .subscribe({
        next: task => {
          console.log(`am creat`, task);
          this.router.navigate(['/tasks']);
        },
        error: (err) => alert('NU ESTE BACKEND!')
      });
  }
}
