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
    this.http.get<Task[]>(`${environment.api}/tasks`)
      .subscribe(taskList => {
        this.tasks = taskList;
        this.tasks$.next(this.tasks);
      })

  }

  public createTask(task: Task) {
    return this.http.post<Task>(`${environment.api}/tasks`, task);
  }

  public getTask(id: string) {
    return this.http.get<Task>(`${environment.api}/tasks/${id}`);
  }

  public updateTask(task: Task) {
    return this.http.put<Task>(`${environment.api}/tasks`, task);
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
