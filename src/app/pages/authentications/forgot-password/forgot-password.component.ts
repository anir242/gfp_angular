import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../_base/base/base.component';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Response} from '../../../_models/api/response';
import {LoginInterface} from '../../../_models/api/login-interface';
import { AuthenticationService } from '../../../_services/authentication/authentication.service';
import { MoosendService } from '../../../_services/moosend.service';
import {AlertTypes} from '../../../_models/components/alert-types';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit{
  @ViewChild('submit', {static: true}) submit: MatButton;
  constructor(
    private authenticationService: AuthenticationService,
    private moosend: MoosendService
  ) {
    super();
  }
  user = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
    ]),
    remember: new UntypedFormControl(false)
  });
  ngOnInit(): void {
    this.submit.disabled = false;
  }
  passwordRecovery = async () => {
    if (this.user.valid) {
      const params = this.user.value;
      try {
        const response: Response<LoginInterface> = await this.authenticationService.passwordRecovery(params);
        if (response?.success) {
          await this.showAlert({
            title: this.translate.instant('forgotPassword.alertTitle'),
            text: this.translate.instant('forgotPassword.alertText'),
            type: AlertTypes.titleAndText
          });
          this.moosend.subscriber(this.email.value);
          await this.router.navigate(['/']);
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.logError(e);
        this.showErrorResponse(e);
      }
    }
  }
  get email(): any {
    return this.user.get('email');
  }
}
