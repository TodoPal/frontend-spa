import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodos = createFeatureSelector<TodoState>('todoState');
export const selectAllTodos = createSelector(
  selectTodos,
  (todoState: TodoState) => todoState.todos
);

export const selectUsersForTodo = createSelector(
  selectTodos,
  (todoState: TodoState) => todoState.users
);

export const selectAllAssignedTodos = createSelector(
  selectTodos,
  (todoState: TodoState) => todoState.assignedTodos
);

export const selectTodoById = createSelector(
  selectTodos,
  (todoState: TodoState) => todoState.todoById
);
