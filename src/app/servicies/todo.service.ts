import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../entities/todo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly URL = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient) {}

  getTodos(username: string | null): Observable<Todo[]> {
    const params = this.createdByParam(username);
    return this.http.get<Todo[]>(this.URL, { params });
  }

  deleteTodo(id: string | undefined, createdBy: string | null): Observable<any> {
    const params = this.createdByParam(createdBy);
    return this.http.delete(`${this.URL}/${id}`, { params });
  }

  addTodo(title: string, text: string, edited: string, createdBy: string | null): Observable<Todo> {
    const todo: Todo = {
      id: undefined,
      title,
      text,
      edited,
      users: []
    };
    const params = this.createdByParam(createdBy);
    return this.http.post<Todo>(this.URL, todo, { params });
  }

  editTodo(id: string, title: string, text: string, edited: string): Observable<Todo> {
    const todo: Todo = {
      id,
      title,
      text,
      edited,
      users: []
    };
    return this.http.patch<Todo>(`${this.URL}/${id}`, todo);
  }

  getUsers(todoId: string | undefined): Observable<string[]> {
    return this.http.get<string[]>(`${this.URL}/getUsersFor/${todoId ?? ''}`);
  }

  addUserForTodo(todoId: string, username: string, time: string): Observable<Todo> {
    const params = new HttpParams()
      .set('username', username)
      .set('time', time);
    return this.http.patch<Todo>(`${this.URL}/${todoId}/addUser`, undefined, { params });
  }

  removeUserFromTodo(todoId: string, username: string): Observable<Todo> {
    const params = new HttpParams()
      .set('username', username);
    return this.http.patch<Todo>(`${this.URL}/${todoId}/removeUser`, undefined, { params });
  }

  getAssignedTodos(username: string | null): Observable<Todo[]> {
    let params = new HttpParams();
    if (username) {
      params = params.set('username', username);
    }
    return this.http.get<Todo[]>(`${this.URL}/assigned`, { params });
  }

  loadTodoById(todoId: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.URL}/${todoId}`);
  }

  private createdByParam(createdBy: string | null): HttpParams {
    let params = new HttpParams();
    if (createdBy) {
      params = params.set('createdBy', createdBy);
    }
    return params;
  }
}
