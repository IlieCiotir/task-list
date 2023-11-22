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
  public tasks: Task[] = [{
    "id": "aee9db8a-614f-4be1-b90d-94681a39e9b9",
    "title": "Decide project name",
    "description": "A project without a name is no project at all",
    "dueDate": "2023-11-21T07:32:38.224Z",
    "importance": "high",
    "done": false
  },
  {
    "id": "fa98e39f-3f20-4325-9f43-3c92133336df",
    "title": "Establish project scope",
    "description": "Work out what needs to get done",
    "dueDate": "2023-11-21T07:32:38.224Z",
    "importance": "normal",
    "done": false
  },
  {
    "id": "22b8632c-5027-4983-a116-290bb394570a",
    "title": "Find a customer",
    "description": "Someone has to pay for this too",
    "dueDate": "2023-11-21T07:32:38.224Z",
    "importance": "low",
    "done": false
  }];
  public tasks$ = new Subject<Task[]>();

  constructor(private http: HttpClient) {
  }

  public loadTasks() {
    return this.http.get<Task[]>(`${environment.api}/tasks`);
  }
  public get(id: string) {
    return this.http.get<Task>(`${environment.api}/tasks/${id}`);
  }

  public createTask(task: Task) {
    return this.http.post<Task>(`${environment.api}/tasks`, task)
  }

  public updateTask(task: Task) {
    return this.http.put<Task>(`${environment.api}/tasks`, task)
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
