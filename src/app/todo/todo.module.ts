import { NgModule } from '@angular/core';
import { TodoPageRoutingModule } from './todo-routing.module';
import { TodoListPage } from './todo-list.component';
import { CommonModule } from '@angular/common';
import { TodoDialog } from './components/todo-dialog/todo-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserForTodoDialog } from './components/add-user-for-todo-dialog/add-user-for-todo-dialog.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoComponent } from './components/todo/todo.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgIconsModule } from '@ng-icons/core';
import { heroPencil, heroTrash, heroUserPlus, heroXMark } from '@ng-icons/heroicons/outline';

@NgModule({
  imports: [
    TodoPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgIconsModule.withIcons({ heroXMark, heroPencil, heroUserPlus, heroTrash })
  ],
  declarations: [ TodoListPage, TodoDialog, AddUserForTodoDialog, TodoCardComponent, TodoComponent ]
})
export class TodoPageModule {}
