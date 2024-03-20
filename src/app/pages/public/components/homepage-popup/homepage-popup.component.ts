import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { TagTypes } from 'src/app/_models/components/tag-types';
import {Response} from '../../../../_models/api/response';
import {NewsletterService} from '../../../../_services/public/newsletter.service';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-homepage-popup',
  templateUrl: './homepage-popup.component.html',
  styleUrls: ['./homepage-popup.component.scss']
})
export class HomepagePopupComponent extends BaseComponent implements OnInit {
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
  ngOnInit(): void {
  }
  subscribeUpdate = async () => {
    if (this.email.valid) {
      const params: any = {
        email: this.email.value,
        tags: [TagTypes.NEWSLETTER],
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
}
