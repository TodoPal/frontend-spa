import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './welcome-routing.module';
import { LoginPage } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginPage,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WelcomeModule {}
