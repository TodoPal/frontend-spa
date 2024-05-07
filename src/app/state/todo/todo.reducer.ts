import { Todo } from '../../entities/todo.model';
import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  addTodoFailed,
  addTodoSuccess,
  addUserForTodo,
  addUserForTodoFailed,
  addUserForTodoSuccess,
  deleteTodo,
  deleteTodoFailed,
  deleteTodoSuccess,
  editTodo,
  editTodoFailed,
  editTodoSuccess,
  getUsers,
  getUsersFailed,
  getUsersSuccess,
  loadAssignedTodos,
  loadAssignedTodosFailed,
  loadAssignedTodosSuccess,
  loadTodoById, loadTodoByIdFailed, loadTodoByIdSuccess,
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  removeUserFromTodo,
  removeUserFromTodoSuccess
} from './todo.actions';

export interface TodoState {
  todoById: Todo | undefined;
  todos: Todo[];
  assignedTodos: Todo[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
  users: string[];
}

export const initialTodoState: TodoState = {
  todoById: undefined,
  todos: [],
  assignedTodos: [],
  error: null,
  status: 'pending',
  users: []
};

export const TodoReducer = createReducer(
  // Supply the initial state
  initialTodoState,
  // Trigger loading the todos
  on(loadTodos, (state) => ({ ...state, status: 'loading' as const })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  on(deleteTodoSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success' as const
  })),
  // Handle todos load failure
  on(deleteTodoFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    error: null,
    status: 'success' as const
  })),
  // Handle todos load failure
  on(loadTodosFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(addTodo, (state, { title, text, edited }) => ({
    ...state,
    status: 'loading' as const,
    todos: [ ...state.todos, { id: undefined, title, text, users: [], edited } ]
  })),
  on(addTodoSuccess, (state, { id }) => ({
    ...state,
    status: 'success' as const,
    error: null,
    todos: state.todos.map(todo => todo.id === undefined ? { ...todo, id } : todo)
  })),
  on(addTodoFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(getUsers, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(getUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    status: 'success' as const
  })),
  on(getUsersFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(addUserForTodo, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(addUserForTodoSuccess, (state, { updatedTodo }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.map(todo => todo.id === updatedTodo?.id ? { ...todo, users: updatedTodo?.users ?? [] } : todo)
  })),
  on(addUserForTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(removeUserFromTodo, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(removeUserFromTodoSuccess, (state, { updatedTodo }) => ({
    ...state,
    status: 'success' as const,
    todos: state.todos.map(todo => todo.id === updatedTodo?.id ? { ...todo, users: updatedTodo?.users ?? [] } : todo)
  })),
  on(addUserForTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(editTodo, (state, { id, title, text, edited }) => ({
    ...state,
    status: 'loading' as const,
    todos: state.todos.map(todo => todo.id === id ? { ...todo, title, text, edited } : todo)
  })),
  on(editTodoSuccess, (state) => ({
    ...state,
    status: 'success' as const
  })),
  on(editTodoFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(loadAssignedTodos, (state) => ({ ...state, status: 'loading' as const })),
  on(loadAssignedTodosSuccess, (state, { assignedTodos }) => ({
    ...state,
    assignedTodos,
    error: null,
    status: 'success' as const
  })),
  on(loadAssignedTodosFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(loadTodoById, (state) => ({ ...state, status: 'loading' as const })),
  on(loadTodoByIdSuccess, (state, { todo }) => ({
    ...state,
    todoById: todo,
    error: null,
    status: 'success' as const
  })),
  on(loadTodoByIdFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  }))
);
