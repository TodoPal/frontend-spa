import { initialTodoState, TodoState } from './todo/todo.reducer';
import { initialUserState, UserState } from './user/user.reducer';
import { Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { logoutUser } from './user/user.actions';

export interface AppState {
  todoState: TodoState;
  userState: UserState;
}

export function logout(reducer: ActionReducer<AppState>) {
  return function(state: AppState, action: Action) {
    if (action.type === logoutUser().type) {
      state = {
        todoState: initialTodoState,
        userState: initialUserState
      };
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [ logout ];
