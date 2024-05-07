import { Component, signal } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { deleteUser, getProfile } from '../state/user/user.actions';
import { selectCurrentUser, selectUserProfile } from '../state/user/user.selectors';
import { Profile } from '../entities/profile.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroTrash } from '@ng-icons/heroicons/outline';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    SharedModule
  ],
  viewProviders: [
    provideIcons({ heroTrash })
  ]
})
export class ProfileComponent {
  isAvatarLoaded = signal<boolean>(false);
  profile$ = this.store.select<Profile | null>(selectUserProfile);

  private currentUsername$ = this.store.select<string | null>(selectCurrentUser);
  protected currentUsername: string = '';

  /**
   * The password must contain at least:
   *    * one digit (0-9)
   *    * one lowercase letter (a-z)
   *    * one uppercase letter (A-Z)
   *    * one special character (@$!%*#?&^_-)
   * It must be at least 10 characters long
   */
  private readonly pwd_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&^_-])[A-Za-z\d[@$!%*#?&^_-].{9,}/;

  pwdFormGroup = this._formBuilder.group({
    pwdCtrl: [ '', [ Validators.required, Validators.minLength(10), Validators.pattern(this.pwd_regex) ] ]
  });

  constructor(private store: Store, private _formBuilder: FormBuilder) {
    this.currentUsername$.pipe(
      takeUntilDestroyed(),
      filter(username => username !== null),
      map(username => String(username)),
      tap(username => {
        this.currentUsername = username;
        this.store.dispatch(getProfile({ username }));
      })
    ).subscribe();
  }

  deleteUser(): void {
    console.log('Deleting user...');
    this.store.dispatch(deleteUser({ username: this.currentUsername, password: this.pwdFormGroup.value.pwdCtrl ?? '' }));
  }
}
