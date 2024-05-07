import { createAction, props } from '@ngrx/store';
import { Todo } from '../../entities/todo.model';

export const loadTodos = createAction('[Todo Page] Load Todos');

export const deleteTodo = createAction(
  '[Todo Page] Delete Todo',
  props<{ id: string | undefined; }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo API] Delete Todo Success'
);

export const deleteTodoFailed = createAction(
  '[Todo API] Delete Todo Failed',
  props<{ error: string; }>()
);

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[]; }>()
);

export const loadTodosFailed = createAction(
  '[Todo API] Todo Load Failed',
  props<{ error: string; }>()
);

export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ title: string; text: string; edited: string; }>()
);

export const addTodoSuccess = createAction(
  '[Todo API] Add Todo Success',
  props<{ id: string | undefined; }>()
);

export const addTodoFailed = createAction(
  '[Todo API] Add Todo Failed',
  props<{ error: string; }>()
);

export const editTodo = createAction(
  '[Todo Page] Edit Todo',
  props<{ id: string; title: string; text: string; edited: string; }>()
);

export const editTodoSuccess = createAction(
  '[Todo API] Edit Todo Success',
  props<{ id: string | undefined; }>()
);

export const editTodoFailed = createAction(
  '[Todo API] Edit Todo Failed',
  props<{ error: string; }>()
);

export const getUsers = createAction(
  '[Add users for todo dialog] Getting users for selection, except the already assigned users',
  props<{ todoId: string | undefined; }>()
);

export const getUsersSuccess = createAction(
  '[Backend API] getUsers successful',
  props<{ users: string[]; }>()
);

export const getUsersFailed = createAction(
  '[Backend API] getUsers failed',
  props<{ error: string; }>()
);

export const addUserForTodo = createAction(
  '[Todo Page] Adding new user to a todo',
  props<{ todoId: string; username: string; time: string; }>()
);

export const addUserForTodoSuccess = createAction(
  '[Todo API] addUserForTodo successful',
  props<{ updatedTodo: Todo | undefined; }>()
);
export const addUserForTodoFailed = createAction(
  '[Todo API] addUserForTodo failed',
  props<{ error: string; }>()
);

export const removeUserFromTodo = createAction(
  '[Todo Page] Remove a user from a todo',
  props<{ todoId: string; username: string; }>()
);

export const removeUserFromTodoSuccess = createAction(
  '[Todo API] removeUserFromTodo successful',
  props<{ updatedTodo: Todo | undefined; }>()
);

export const removeUserFromTodoFailed = createAction(
  '[Todo API] removeUserFromTodo failed',
  props<{ error: string; }>()
);

export const loadAssignedTodos = createAction('[Todo Page] Load Assigned Todos');

export const loadAssignedTodosSuccess = createAction(
  '[Todo API] Assigned Todo Load Success',
  props<{ assignedTodos: Todo[]; }>()
);

export const loadAssignedTodosFailed = createAction(
  '[Todo API] Assigned Todo Load Failed',
  props<{ error: string; }>()
);

export const loadTodoById = createAction(
  '[Todo Page] Load Todo by ID',
  props<{ todoId: string; }>()
);

export const loadTodoByIdSuccess = createAction(
  '[Todo API] Load Todo by ID Success',
  props<{ todo: Todo; }>()
);

export const loadTodoByIdFailed = createAction(
  '[Todo API] Load Todo by ID Failed',
  props<{ error: string; }>()
);
