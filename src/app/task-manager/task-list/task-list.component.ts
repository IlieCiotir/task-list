import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../task-service/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, combineLatest, merge, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  public tasks: Task[] = [];
  public searchInput$ = new Subject<string>();

  constructor(private tasksService: TaskService) {
    this.searchInput$.subscribe(term => console.log(term));

    const searchTerm$ = this.searchInput$.pipe(
      debounceTime(500),
      filter(term => term.length >= 2 || term.length === 0)
    );
    const defaultSearch$ = merge(searchTerm$, of(''))

    combineLatest([this.tasksService.tasks$, defaultSearch$])
      .pipe(
        tap(event => console.log(`inainte`, event)),
        map(([tasks, term]) => tasks.filter(task => task.title.toUpperCase().includes(term.toUpperCase()))),
        tap(event => console.log(`dupa`, event))
      )
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit() {
    this.tasksService.loadTasks();
  }

  searchFor(term: string) {
    this.searchInput$.next(term);

    //  this.tasks = this.tasks.filter(task => task.title.includes(term));
  }
}
