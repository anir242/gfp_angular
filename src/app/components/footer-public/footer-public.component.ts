import { Component, OnInit } from '@angular/core';
import {RoutingTypes} from '../../_models/components/routing-types';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {SocialTypes} from '../../_models/components/social-types';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Response} from '../../_models/api/response';
import {NewsletterService} from '../../_services/public/newsletter.service';
import { TagTypes } from 'src/app/_models/components/tag-types';

@Component({
  selector: 'app-footer-public',
  templateUrl: './footer-public.component.html',
  styleUrls: ['./footer-public.component.scss']
})
export class FooterPublicComponent extends BaseComponent implements OnInit {
  year: number = new Date().getFullYear();
  routingTypes = RoutingTypes;
  socialTypes = SocialTypes;
  popup: any;
  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
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

  ngOnInit(): void {
  }
  get email(): UntypedFormControl {
    return this.data?.get('email') as UntypedFormControl;
  }
  goToSocial(type: string): void{
    switch (type){
      case this.socialTypes.instagram: {
        window.open('https://www.instagram.com/green.futureproject/');
        break;
      }
      case this.socialTypes.linkedin: {
        window.open('https://www.linkedin.com/company/green-future-project');
        break;
      }
      case this.socialTypes.youtube: {
        window.open('https://www.youtube.com/channel/UCoV71yXXEx7coGwGHa8bPWA');
        break;
      }
      case this.socialTypes.facebook: {
        window.open('https://www.facebook.com/greenfutureproject/');
        break;
      }
    }
  }

  subscribeUpdate = async () => {
    if (this.email.valid) {
      const tags = [TagTypes.NEWSLETTER]
      localStorage.getItem('clientType') === '2' ? tags.push(TagTypes.BUSINESS) : tags.push(TagTypes.INDIVIDUAL);
      const params: any = {
        email: this.email.value,
        tags: tags,
        newsletter: true
      };
      try {
        const response: Response<any> = await this.newsletterService.subscribeNewsletter(params);
        if (response?.success) {
          this.identify('generate_lead', 'newsletter');
          this.popup = document.getElementById('popup2');
          this.popup.classList.add("overlayShow");
          this.showSuccess(this.translate.instant('subscribeProject.description'), this.translate.instant('subscribeProject.title'));
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
    }
  }

  close(): void{
    this.popup = document.getElementById('popup2');
    this.popup.classList.remove("overlayShow");
  }
}
