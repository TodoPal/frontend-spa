import { Component, ElementRef, Input, ViewChild, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsers } from '../../../state/todo/todo.actions';
import { selectUsersForTodo } from '../../../state/todo/todo.selectors';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user-for-todo-dialog',
  templateUrl: './add-user-for-todo-dialog.component.html'
})
export class AddUserForTodoDialog {
  @ViewChild('addUserDialog') dialog!: ElementRef<HTMLDialogElement>;

  @Input({ required: true }) todoTitle: string | undefined;
  @Input({ required: true }) todoId: string | undefined;

  usernameToAdd = output<string>();

  usernameInputControl = new FormControl();
  usersForTodo$ = this.store.select<string[]>(selectUsersForTodo);
  filteredUsersForTodo$: Observable<string[]> = this.usersForTodo$;

  constructor(public store: Store) {}

  open(): void {
    this.store.dispatch(getUsers({ todoId: this.todoId }));
    this.dialog.nativeElement.showModal();
  }

  save(): void {
    this.usernameToAdd.emit(this.usernameInputControl.value);
  }
}
