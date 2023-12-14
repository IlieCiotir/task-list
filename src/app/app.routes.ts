import { Routes } from '@angular/router';
import { TaskListComponent } from './task-manager/task-list/task-list.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'myTasks', component: TaskListComponent },
    { path: "**", redirectTo: "/tasks" }
];
