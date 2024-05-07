import { Component } from '@angular/core';
import { Todo } from '../../../entities/todo.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTodoById } from '../../../state/todo/todo.actions';
import { selectTodoById } from '../../../state/todo/todo.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinct, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.scss' ]
})
export class TodoComponent {
  todo: Todo | undefined;

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {
    // get todoId from url
    this.store.dispatch(loadTodoById({ todoId: this.route.snapshot.url[1].path }));

    this.store.select<Todo | undefined>(selectTodoById).pipe(
      takeUntilDestroyed(),
      distinct(),
      tap(todo => { this.todo = todo; })
    ).subscribe();
  }
}
