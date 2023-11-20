import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | Date;
  importance: 'low' | 'normal' | 'high';
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks: Task[] = [];
  public tasks$ = new Subject<Task[]>();

  constructor(private http: HttpClient) {
  }

  public loadTasks() {

  }

  public createTask(task: Task) {
    this.http.post<Task>(`${environment.api}/tasks`, task)
      .subscribe(newTask => {
        this.tasks = [...this.tasks, newTask];
        this.notify();
      })
  }

  public updateTask(task: Task) {
    this.http.put<Task>(`${environment.api}/tasks`, task)
      .subscribe(updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        this.tasks.splice(index, 1, updatedTask);
        this.notify();
      });
  }

  public deleteTask(task: Task) {
    this.http.delete(`${environment.api}/tasks/${task.id}`)
      .subscribe(_ => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
        this.notify();
      })
  }

  private notify() {
    this.tasks$.next(this.tasks);
  }
}
