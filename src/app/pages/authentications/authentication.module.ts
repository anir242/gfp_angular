import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from '../../_modules/shared/shared.module';
import {LoginComponent} from './login/login.component';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {AboutYourAccountComponent} from './components/about-your-account/about-your-account';
import { AboutYouComponent } from './components/about-you/about-you.component';
import { AboutYourCompanyComponent } from './components/about-your-company/about-your-company.component';
import { LoginDataComponent } from './components/login-data/login-data.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutYourAccountComponent,
    AboutYouComponent,
    AboutYourCompanyComponent,
    LoginDataComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
  ],
  exports: [
    AboutYourAccountComponent,
    AboutYourCompanyComponent,
    LoginDataComponent
  ],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule {
}
