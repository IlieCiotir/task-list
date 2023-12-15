import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../task-service/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Subject, combineLatest, merge, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements AfterViewInit {
  public tasks: Task[] = [];
  public searchInput$ = new Subject<string>();

  @ViewChild('searchInput')
  public searchInputField?: ElementRef<HTMLInputElement>;

  constructor(private tasksService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) {
    const urlSearch = this.activatedRoute.snapshot.queryParams['search'] || '';

    this.searchInput$.subscribe(term => console.log(term));

    const searchTerm$ = this.searchInput$.pipe(
      debounceTime(500),
      filter(term => term.length >= 2 || term.length === 0)
    );
    const defaultSearch$ = merge(searchTerm$, of(urlSearch))

    combineLatest([this.tasksService.tasks$, defaultSearch$])
      .pipe(
        tap(event => console.log(`inainte`, event)),
        map(([tasks, term]) => tasks.filter(task => task.title.toUpperCase().includes(term.toUpperCase()))),
        tap(event => console.log(`dupa`, event))
      )
      .subscribe(tasks => this.tasks = tasks);

    searchTerm$.subscribe(term => {
      this.router.navigate([], {
        queryParams: { search: term }
      })
    })
  }

  ngAfterViewInit(): void {
    console.log(`searchInput`, this.searchInputField)
    if (this.searchInputField) {
      this.searchInputField.nativeElement.value = this.activatedRoute.snapshot.queryParams['search'] || '';
    }
  }

  ngOnInit() {
    this.tasksService.loadTasks();
  }

  searchFor(term: string) {
    this.searchInput$.next(term);

    //  this.tasks = this.tasks.filter(task => task.title.includes(term));
  }
}
