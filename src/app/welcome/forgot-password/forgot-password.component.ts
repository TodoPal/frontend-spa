import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ './forgot-password.component.scss' ]
})
export class ForgotPasswordComponent {
  readonly usernameControl = new FormControl('', [ Validators.required ]);

  submit(): void {
    // todo: implement
  }
}
