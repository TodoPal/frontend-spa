import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../servicies/user.service';
import {
  deleteUser, deleteUserFailed, deleteUserSuccess,
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
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { SnackBarService } from '../../servicies/snack-bar.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtUtilService } from '../../shared/jwt-util/jwt-util.service';
import { AuthService } from '../../servicies/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfileService } from '../../servicies/user_profile.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private service: UserService,
    private notificationService: SnackBarService,
    private router: Router,
    private cookieService: CookieService,
    private jwtUtil: JwtUtilService,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(({ userInputDto, rememberUser }) =>
        this.authService.loginUser(userInputDto).pipe(
          tap(token => console.log(token)),
          map(jwtToken => {
            return passwordCorrect({ username: userInputDto.username, rememberUser, jwtToken });
          }),
          catchError((errorResponse: HttpErrorResponse) => of(loginUserFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  loginUserWithJwt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserWithJwt),
      switchMap(({ jwtToken }) =>
        this.authService.loginUserWithJwt(jwtToken).pipe(
          map(username => {
            return loginUserWithJwtSuccess({ username });
          }),
          catchError(() => of(loginUserFailed))
        )
      )
    )
  );

  loginUserWithJwtSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserWithJwtSuccess),
      map(() => {
        // this.notificationService.success('Login successful', '', 3000);
        this.router.navigate([ '/todos' ]);
      })
    ),
  { dispatch: false }
  );

  loginUserFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserFailed),
      map(({ error }) => {
        if (error) {
          this.notificationService.error(error, '', 3000);
        }
      })
    ),
  { dispatch: false }
  );

  passwordCorrect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(passwordCorrect),
      map(({ username, rememberUser, jwtToken }) => {
        let diffDays = undefined;
        if (rememberUser) {
          const expires = this.jwtUtil.getExpiration(jwtToken);
          if (expires !== undefined) {
            const expiresDate = new Date(expires * 1000);
            const diff = Math.abs(expiresDate.getTime() - new Date().getTime());
            diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          }
        }
        this.cookieService.set('jwtToken', jwtToken, diffDays);
        sessionStorage.setItem('jwtToken', jwtToken);
        this.notificationService.success('Login successful', '', 3000);
        this.router.navigate([ '/todos' ]);
      })
    ),
  { dispatch: false }
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      switchMap(({ username, password }) =>
        this.service.registerUser(username, password).pipe(
          map(() => registerUserSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(registerUserFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  registerUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserSuccess),
      map(() => {
        this.notificationService.success('Registration successful.', '', 3000);
        this.router.navigate([ '/' ]);
      })
    ),
  { dispatch: false }
  );

  registerUserFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserFailed),
      map(({ error }) => this.notificationService.error(error, '', 3000))
    ),
  { dispatch: false }
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      map(() => {
        this.cookieService.delete('jwtToken');
        this.router.navigate([ '/' ]);
      })
    ),
  { dispatch: false }
  );

  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfile),
      switchMap(({ username }) =>
        this.userProfileService.getProfile(username).pipe(
          map(profile => getProfileSuccess({ profile })),
          catchError((errorResponse: HttpErrorResponse) => of(getProfileFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  getProfileFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfileFailed),
      map(({ error }) => this.notificationService.error(error, '', 3000))
    ),
  { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap(({ username, password }) =>
        this.service.deleteUser(username, password).pipe(
          map(result => deleteUserSuccess()),
          catchError((errorResponse: HttpErrorResponse) => of(deleteUserFailed({ error: errorResponse.error })))
        )
      )
    )
  );

  deleteUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserSuccess),
      map(() => {
        this.notificationService.success('Delete user was successful', '', 3000);
        return logoutUser();
      })
    )
  );

  deleteUserFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserFailed),
      map(({ error }) => this.notificationService.error(error, '', 3000))
    ),
  { dispatch: false }
  );
}
