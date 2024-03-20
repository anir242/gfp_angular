import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'GFP | Login'
  }, {
    path: 'register',
    component: SignupComponent,
    title: 'GFP | Sign Up'
  }, {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    title: 'GFP | Forgot Password'
  }, {
    path: 'resetPassword/:token',
    component: ResetPasswordComponent,
    title: 'GFP | Reset Password'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
