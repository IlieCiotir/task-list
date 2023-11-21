import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subject, combineLatest, merge, of } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { Task, TaskService } from '../task-service/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, RouterOutlet],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, AfterViewInit {
  public tasks: Task[] = [];

  private search$ = new Subject<string>();

  @ViewChild("searchInput")
  private inputSearchElement?: ElementRef<HTMLInputElement>;

  constructor(private tasksService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) {
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
    combineLatest([this.tasksService.tasks$, searchWithInitial$])
      .pipe(
        map(([tasks, term]) => tasks
          .filter(task => task.title.toLowerCase().includes(term) || task.description.toLowerCase().includes(term)))
      )
      .subscribe(tasks => this.tasks = tasks);
  }

  ngOnInit() {
    const urlSearch = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (this.inputSearchElement) {
      this.inputSearchElement.nativeElement.value = urlSearch as string;
    } else {
      console.log('Undefined?')
    }

    this.tasksService.loadTasks();
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
}
