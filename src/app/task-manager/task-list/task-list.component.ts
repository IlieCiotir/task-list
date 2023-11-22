import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subject, combineLatest, merge, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { Task, TaskService } from '../task-service/task.service';
import { Store } from '@ngrx/store';
import { TaskListActions } from './model/task-list.actions';
import { selectDoubleCount, selectTaskListState, selectTasks } from './model/task-list.selectors';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatButtonModule, RouterOutlet,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  public tasks: Task[] = [];

  private search$ = new Subject<string>();

  @ViewChild("searchInput")
  private inputSearchElement?: ElementRef<HTMLInputElement>;
  public counter = 0;

  constructor(private tasksService: TaskService, private router: Router, private activatedRoute: ActivatedRoute,
    private store: Store) {
    // this.tasksService.tasks$.subscribe(tasks => this.tasks = tasks);
    // this.search$.subscribe(term => console.log(term));
    const urlSearch = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (this.inputSearchElement) {
      this.inputSearchElement.nativeElement.value = urlSearch as string;
    } else {
      console.log('Undefined?')
    }
    const searchWithStuff$ = this.search$
      .pipe(
        filter(term => term.length > 2 || term.length === 0),
        debounceTime(500),
        tap(term => this.router.navigate([], { queryParams: { search: term } })),
        map(term => term.toLowerCase())
      );
    const searchWithInitial$ = merge(of(urlSearch ? urlSearch : ''), searchWithStuff$);
    const tasks$ = this.store.select(selectTasks)
    combineLatest([tasks$, searchWithInitial$])
      .pipe(
        map(([tasks, term]) => tasks
          .filter(task => task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)))
      )
      .subscribe(tasks => this.tasks = tasks);

    this.store.select(selectDoubleCount)
      .subscribe(({ cheatCounter }) => {
        this.counter = cheatCounter;
      })
  }

  ngOnInit() {
    const urlSearch = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (this.inputSearchElement) {
      this.inputSearchElement.nativeElement.value = urlSearch as string;
    } else {
      console.log('Undefined?')
    }

    // this.tasksService.loadTasks();
    this.store.dispatch(TaskListActions.loadTasksList());
  }

  ngAfterViewInit(): void {
    const urlSearch = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (this.inputSearchElement) {
      this.inputSearchElement.nativeElement.value = urlSearch as string;
    } else {
      console.log('Undefined?')
    }
  }
  search(term: any) {
    this.search$.next(term);

    //this.tasks = this.tasks
    // .filter(task => task.title.includes(term) || task.description.includes(term))
  }

  incrementCounter() {
    this.store.dispatch(TaskListActions.increment());
  }

  decrementCounter() {
    this.store.dispatch(TaskListActions.decrement());
  }

  updateCounter(amount: number) {
    this.store.dispatch(TaskListActions.updateCounter({ amount }))
  }
}
