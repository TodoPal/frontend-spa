import { createAction, props } from '@ngrx/store';
import { Profile } from '../../entities/profile.model';
import { UserInputDto } from '../../entities/user_input_dto.model';

export const loginUser = createAction(
  '[Login Page] Log In User',
  props<{
    userInputDto: UserInputDto;
    rememberUser: boolean;
  }>()
);

export const loginUserWithJwt = createAction(
  '[Login Page] Log In User with JWT',
  props<{
    jwtToken: string;
  }>()
);

export const loginUserWithJwtSuccess = createAction(
  '[Auth API] loginUserWithJwt success',
  props<{
    username: string;
  }>()
);

export const loginUserFailed = createAction(
  '[Auth API] loginUser failed',
  props<{ error: string; }>()
);

export const passwordCorrect = createAction(
  '[Auth API] User password is correct',
  props<{
    username: string;
    rememberUser: boolean;
    jwtToken: string;
  }>()
);

export const registerUser = createAction(
  '[SignUp Page] Register User',
  props<{ username: string; password: string; }>()
);

export const registerUserSuccess = createAction(
  '[Auth API] registerUser successful'
);

export const registerUserFailed = createAction(
  '[Auth API] registerUser failed',
  props<{ error: string; }>()
);

export const logoutUser = createAction(
  '[Header log out] Log out user'
);

export const getProfile = createAction(
  '[Profile Page] get user profile data',
  props<{ username: string; }>()
);

export const getProfileSuccess = createAction(
  '[User API] getProfile successful',
  props<{ profile: Profile; }>()
);

export const getProfileFailed = createAction(
  '[User API] getProfile failed',
  props<{ error: string; }>()
);

export const deleteUser = createAction(
  '[Profile Page] delete user profile',
  props<{ username: string; password: string; }>()
);

export const deleteUserSuccess = createAction('[User API] deleteUser successful');

export const deleteUserFailed = createAction(
  '[User API] deleteUser failed',
  props<{ error: string; }>()
);
