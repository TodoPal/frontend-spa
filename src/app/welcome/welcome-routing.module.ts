import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPage } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'signup',
    component: LoginPage
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MainPageRoutingModule {}
