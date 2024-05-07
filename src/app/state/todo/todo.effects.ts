import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { TodoService } from '../../servicies/todo.service';
import {
  addTodo,
  addTodoSuccess,
  addTodoFailed,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailed,
  getUsers,
  getUsersSuccess,
  getUsersFailed,
  loadTodos,
  loadTodosSuccess,
  loadTodosFailed,
  addUserForTodo,
  addUserForTodoFailed,
  addUserForTodoSuccess,
  removeUserFromTodo,
  removeUserFromTodoFailed,
  removeUserFromTodoSuccess,
  editTodoFailed,
  editTodo,
  editTodoSuccess,
  loadAssignedTodos,
  loadAssignedTodosSuccess,
  loadAssignedTodosFailed, loadTodoById, loadTodoByIdSuccess, loadTodoByIdFailed
} from './todo.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { SnackBarService } from '../../servicies/snack-bar.service';
import { selectCurrentUser } from '../user/user.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private service: TodoService,
    private notificationService: SnackBarService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.store.select<string | null>(selectCurrentUser).pipe(
          take(1),
          switchMap(currentUser =>
            this.service.getTodos(currentUser).pipe(
              map(todos => loadTodosSuccess({ todos })),
              catchError((errorResponse: HttpErrorResponse) => of(loadTodosFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap(({ id }) =>
        this.store.select<string | null>(selectCurrentUser).pipe(
          take(1),
          switchMap(currentUser =>
            this.service.deleteTodo(id, currentUser).pipe(
              map(() => deleteTodoSuccess()),
              catchError((errorResponse: HttpErrorResponse) => of(deleteTodoFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  deleteTodoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodoSuccess),
      map(() => {
        this.notificationService.success('Delete successful', 'Close');
      })
    ),
  { dispatch: false }
  );

  loadTodosFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodosFailed),
      map(({ error }) => {
        console.error(error);
        this.notificationService.error('Failed to load Todos.', 'Close');
      })
    ),
  { dispatch: false }
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ title, text, edited }) =>
        this.store.select<string | null>(selectCurrentUser).pipe(
          take(1),
          switchMap(currentUser =>
            this.service.addTodo(title, text, edited, currentUser).pipe(
              map((todo) => addTodoSuccess({ id: todo.id })),
              catchError((errorResponse: HttpErrorResponse) => of(addTodoFailed({ error: errorResponse.error })))
            )
          )
        )
      )
    )
  );

  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTodo),
      switchMap(({ id, title, text, edited }) =>
        this.service.editTodo(id, title, text, edited).pipe(
          map((todo) => editTodoSuccess({ id: todo.id })),
          catchError((errorResponse: HttpErrorResponse) => of(editTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(({ todoId }) =>
        this.service.getUsers(todoId).pipe(
          map((users) => getUsersSuccess({ users })),
          catchError((errorResponse: HttpErrorResponse) => of(getUsersFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  getUsersFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsersFailed),
      map(({ error }) =>
        this.notificationService.error('Failed to load Users.', 'Close')
      )
    ),
  { dispatch: false }
  );

  addUserForTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserForTodo),
      switchMap(({ todoId, username, time }) =>
        this.service.addUserForTodo(todoId, username, time).pipe(
          map((updatedTodo) => addUserForTodoSuccess({ updatedTodo })),
          catchError((errorResponse: HttpErrorResponse) => of(addUserForTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  addUserForTodoFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserForTodoFailed),
      map(({ error }) =>
        this.notificationService.error('Failed to load Users.', 'Close')
      )
    ),
  { dispatch: false }
  );

  removeUserFromTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromTodo),
      switchMap(({ todoId, username }) =>
        this.service.removeUserFromTodo(todoId, username).pipe(
          map((updatedTodo) => removeUserFromTodoSuccess({ updatedTodo })),
          catchError((errorResponse: HttpErrorResponse) => of(removeUserFromTodoFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  removeUserFromTodoFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromTodoFailed),
      map(({ error }) =>
        this.notificationService.error('Failed to load Users.', 'Close')
      )
    ),
  { dispatch: false }
  );

  loadAssignedTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignedTodos),
      switchMap(() =>
        this.store.select<string | null>(selectCurrentUser).pipe(
          take(1),
          switchMap(currentUser =>
            this.service.getAssignedTodos(currentUser).pipe(
              map(assignedTodos => loadAssignedTodosSuccess({ assignedTodos })),
              catchError(error => of(loadAssignedTodosFailed({ error })))
            )
          )
        )
      )
    )
  );

  loadTodoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoById),
      switchMap(({ todoId }) =>
        this.service.loadTodoById(todoId).pipe(
          map(todo => loadTodoByIdSuccess({ todo })),
          catchError((errorResponse: HttpErrorResponse) => of(loadTodoByIdFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  loadTodoByIdFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoByIdFailed),
      map(({ error }) =>
        this.notificationService.error('Failed to load Todo.', 'Close')
      )
    ),
  { dispatch: false }
  );
}
