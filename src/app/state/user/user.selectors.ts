import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUser = createFeatureSelector<UserState>('userState');
export const selectCurrentUser = createSelector(
  selectUser,
  (userState: UserState) => userState.currentUsername
);

export const selectUserProfile = createSelector(
  selectUser,
  (userState: UserState) => userState.userProfile
);
