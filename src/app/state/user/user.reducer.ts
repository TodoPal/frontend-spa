import { createReducer, on } from '@ngrx/store';
import {
  deleteUser, deleteUserFailed,
  getProfile, getProfileFailed, getProfileSuccess,
  loginUser,
  loginUserFailed,
  loginUserWithJwt,
  loginUserWithJwtSuccess,
  logoutUser,
  passwordCorrect,
  registerUser,
  registerUserFailed,
  registerUserSuccess
} from './user.actions';
import { Profile } from '../../entities/profile.model';

export interface UserState {
  currentUsername: string | null;
  userProfile: Profile | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialUserState: UserState = {
  currentUsername: null,
  userProfile: null,
  error: null,
  status: 'pending'
};

export const UserReducer = createReducer(
  initialUserState,

  on(loginUser, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(loginUserWithJwt, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(loginUserWithJwtSuccess, (state, { username }) => ({
    ...state,
    currentUsername: username,
    status: 'success' as const
  })),
  on(loginUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(passwordCorrect, (state, { username }) => ({
    ...state,
    currentUsername: username,
    status: 'success' as const
  })),
  on(registerUser, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(registerUserSuccess, (state) => ({
    ...state,
    status: 'success' as const
  })),
  on(registerUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(logoutUser, (state) => ({
    ...state,
    currentUsername: null
  })),
  on(getProfile, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(getProfileSuccess, (state, { profile }) => ({
    ...state,
    userProfile: profile,
    status: 'success' as const
  })),
  on(getProfileFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  })),
  on(deleteUser, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(deleteUserFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const
  }))
);
