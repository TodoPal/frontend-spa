import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  // templateUrl: './forgot-password.component.html',
  template: `
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Work in progress...</h1>
        </div>
      </div>
    </div>
  `,
  styleUrls: [ './forgot-password.component.scss' ]
})
export class ForgotPasswordComponent {
  readonly usernameControl = new FormControl('', [ Validators.required ]);

  submit(): void {
    // todo: implement
  }
}
