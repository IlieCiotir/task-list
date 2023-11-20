import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../task-service/task.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  public tasks: Task[] = [];

  constructor(private tasksService: TaskService) {
    this.tasksService.tasks$.subscribe(tasks => this.tasks = tasks)
  }

  ngOnInit() {
    this.tasksService.loadTasks();
  }
}
