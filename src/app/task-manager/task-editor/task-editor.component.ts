import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task-service/task.service';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.scss'
})
export class TaskEditorComponent {

  submit(task: Task) {
    console.log(`submitted`, task);
  }
}
