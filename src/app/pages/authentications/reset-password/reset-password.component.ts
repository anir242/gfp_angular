import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../_base/base/base.component';
import {MatButton} from '@angular/material/button';
import {Response} from '../../../_models/api/response';
import {LoginInterface} from '../../../_models/api/login-interface';
import {AuthenticationService} from '../../../_services/authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';
import Validation from '../../../components/validator/input-equals';
import {AlertTypes} from '../../../_models/components/alert-types';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
  @ViewChild('submit', {static: true}) submit: MatButton;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
  ) {
    super();
  }
  user = new UntypedFormGroup({
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    cPassword: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });
  ngOnInit(): void {
    this.cPassword.addValidators(
      Validation.match(this.password)
    );
  }

  resetPassword = async () => {

    if (this.user.valid){
      const params = {
        token: this.route.snapshot.url[1].path,
        password: this.password.value
      };
      try {
        const response: Response<LoginInterface> = await this.authenticationService.resetPassword(params);
        if (response?.success) {
          await this.showAlert({
            title: this.translate.instant('resetPassword.alertTitle'),
            text: this.translate.instant('resetPassword.alertText'),
            type: AlertTypes.titleAndText
          });
          await this.router.navigate(['/']);
          // await this.router.navigate(['/']);
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.logError(e);
        this.showErrorResponse(e);
      }
    }
  }

  get password(): any {
    return this.user.get('password');
  }

  get cPassword(): AbstractControl {
    return this.user?.get('cPassword');
  }
}
