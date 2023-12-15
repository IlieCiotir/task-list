import { Routes } from '@angular/router';
import { TaskListComponent } from './task-manager/task-list/task-list.component';
import { TaskEditorComponent } from './task-manager/task-editor/task-editor.component';

export const routes: Routes = [
    { path: 'tasks', component: TaskListComponent },
    { path: 'myTasks', component: TaskListComponent },
    { path: 'add', component: TaskEditorComponent },
    { path: 'edit/:id', component: TaskEditorComponent },
    { path: "**", redirectTo: "/tasks" }
];
