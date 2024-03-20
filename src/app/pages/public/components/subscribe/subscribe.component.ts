import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, FormControlName, UntypedFormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../../_base/base/base.component';
import {Response} from '../../../../_models/api/response';
import {LoginInterface} from '../../../../_models/api/login-interface';
import {StorageName} from '../../../../_models/components/storage-name';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {NewsletterService} from '../../../../_services/public/newsletter.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent extends BaseComponent implements OnInit {
  data = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  });

  constructor(
    private newsletterService: NewsletterService,
  ) {
    super();
  }

  get email(): UntypedFormControl {
    return this.data?.get('email') as UntypedFormControl;
  }

  subscribeUpdate = async () => {
    if (this.email.valid) {
      const params: any = {
        email: this.email.value,
        tags: ['Newsletter Only'],
        newsletter: true
      };
      try {
        const response: Response<any> = await this.newsletterService.subscribeNewsletter(params);
        if (response?.success) {
          this.showSuccess(this.translate.instant('subscribeProject.description'), this.translate.instant('subscribeProject.title'));
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
    }
  }

  ngOnInit(): void {
  }

}
