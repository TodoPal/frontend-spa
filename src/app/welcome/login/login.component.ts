import { Component, OnInit } from '@angular/core';
import { formatDate, Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginUser, registerUser } from '../../state/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginPage implements OnInit {
  /**
   * The password must contain at least:
   *    * one digit (0-9)
   *    * one lowercase letter (a-z)
   *    * one uppercase letter (A-Z)
   *    * one special character (@$!%*#?&^_-)
   * It must be at least 10 characters long
   */
  private readonly pwd_regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&^_-])[A-Za-z\d[@$!%*#?&^_-].{9,}/;

  loginFormGroup: FormGroup;
  readonly usernameControl = new FormControl('', [ Validators.required ]);
  readonly pwdControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern(this.pwd_regex)
  ]);

  readonly confirmPwdControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.pattern(this.pwd_regex)
  ]);

  readonly rememberMeControl = new FormControl(false);

  constructor(private location: Location, private store: Store) {
    this.loginFormGroup = new FormGroup({
      usernameControl: this.usernameControl,
      pwdControl: this.pwdControl,
      rememberMeControl: this.rememberMeControl
    });
  }

  ngOnInit(): void {
    if (this.location.path() === '/signup') {
      this.pwdControl.addValidators(Validators.pattern(this.pwd_regex));
      this.loginFormGroup.addControl('confirmPwdControl', this.confirmPwdControl);
    }
  }

  getHeader(): string {
    switch (this.location.path()) {
      case '':
        return 'Log in';

      case '/signup':
        return 'Sign up';

      default:
        return '';
    }
  }

  isLoginPage(): boolean {
    return this.location.path() === '';
  }

  isSignUpPage(): boolean {
    return this.location.path() === '/signup';
  }

  submit(): void {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      this.checkPwds();

      return;
    }
    if (this.isLoginPage()) {
      this.store.dispatch(loginUser({
        userInputDto: {
          username: this.usernameControl.value ?? '',
          password: this.pwdControl.value ?? '',
          joined: formatDate(Date.now(), 'yyyy.MM.dd HH:mm', 'en-US')
        },
        rememberUser: this.rememberMeControl.value ?? false
      }));
    } else if (this.checkPwds()) {
      this.store.dispatch(registerUser({
        username: this.usernameControl.value ?? '',
        password: this.pwdControl.value ?? ''
      }));
    }
  }

  private checkPwds(): boolean {
    if (this.isSignUpPage() && (this.pwdControl.value !== this.confirmPwdControl.value)) {
      this.pwdControl.setErrors({ doNotMatch: true });
      this.confirmPwdControl.setErrors({ doNotMatch: true });

      return false;
    }

    return true;
  }
}
