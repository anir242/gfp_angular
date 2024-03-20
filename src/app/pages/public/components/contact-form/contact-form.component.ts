import { TranslateService } from '@ngx-translate/core';
import { HubspotService } from './../../../../_services/public/hubspot.service';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { BaseComponent } from '../../../../pages/_base/base/base.component';
import { faEnvelope, faPhone } from '@fortawesome/pro-regular-svg-icons';
import { ContactService } from '../../../../_services/public/contact.service';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Response } from '../../../../_models/api/response';
import {
  ContactCategoriesV2,
  ContactSources,
} from '../../../../_models/components/form-options';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent extends BaseComponent implements OnInit {
  form = new UntypedFormGroup({
    fname: new UntypedFormControl('', [Validators.required]),
    lname: new UntypedFormControl('', [Validators.required]),
    company: new UntypedFormControl(''),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    category: new UntypedFormControl(null, [Validators.required]),
    message: new UntypedFormControl(''),
    marketingConsent: new UntypedFormControl(false),
    privacyConsent: new UntypedFormControl(false, [Validators.requiredTrue]),
  });

  faEnvelope = faEnvelope;
  faPhone = faPhone;
  popup: any;
  clientType: string;
  @Input() pageName: string;

  optionsCategory = ContactCategoriesV2;
  optionsSource = ContactSources;
  windowWidth:any = window.innerWidth

  constructor(
    public translate: TranslateService,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private hubspotService: HubspotService
  ) {
    super();
  }

  ngOnInit(): void {
    this.clientType = localStorage.getItem('clientType');
    if (this.clientType === '2') {
      this.form.controls['company'].setValidators([Validators.required]);
    }else{
      this.optionsCategory = this.optionsCategory.filter((el)=> el.type !== 'business')
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  get fname(): UntypedFormControl {
    return this.form.get('fname') as UntypedFormControl;
  }

  get lname(): UntypedFormControl {
    return this.form.get('lname') as UntypedFormControl;
  }

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get category(): UntypedFormControl {
    return this.form.get('category') as UntypedFormControl;
  }

  get company(): UntypedFormControl {
    return this.form.get('company') as UntypedFormControl;
  }

  get message(): UntypedFormControl {
    return this.form.get('message') as UntypedFormControl;
  }

  get marketingConsent(): UntypedFormControl {
    return this.form.get('marketingConsent') as UntypedFormControl;
  }

  get privacyConsent(): UntypedFormControl {
    return this.form.get('privacyConsent') as UntypedFormControl;
  }

  sendContact = async () => {
    const hubspotParams = {
      fields: [
        {
          objectTypeId: '0-1',
          name: 'firstname',
          value: this.fname.value,
        },
        {
          objectTypeId: '0-1',
          name: 'lastname',
          value: this.lname.value,
        },
        {
          objectTypeId: '0-1',
          name: 'email',
          value: this.email.value,
        },
        {
          objectTypeId: '0-1',
          name: 'what_would_you_like_to_reach_out_for_',
          value: this.category.value,
        },
        {
          objectTypeId: '0-1',
          name: 'what_would_you_like_to_share_with_us_',
          value: this.message.value,
        },
        {
          objectTypeId: '0-1',
          name: 'conversion_page',
          value: this.pageName,
        },
        {
          objectTypeId: '0-1',
          name: 'client_type',
          value: this.clientType === '1' ? 'Individual' : 'Business',
        },
        {
          objectTypeId: '0-1',
          name: 'language',
          value: localStorage.getItem('lang')
            ? localStorage.getItem('lang')
            : 'en',
        },
        {
          objectTypeId: '0-1',
          name: 'country',
          value: localStorage.getItem('region')
            ? localStorage.getItem('region')
            : 'all',
        },
        {
          objectTypeId: '0-1',
          name: 'currency',
          value: localStorage.getItem('currency')
            ? localStorage.getItem('currency')
            : 'eur',
        },
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: this.privacyConsent.value,
          text: 'I agree to allow green future project to store and process my personal data.',
          communications: [
            {
              value: this.marketingConsent.value,
              subscriptionTypeId: 999,
              text: 'I agree to receive other communications from green future project.',
            },
          ],
        },
      },
    };

    if (localStorage.getItem('clientType') === '2') {
      hubspotParams.fields.push({
        objectTypeId: '0-1',
        name: 'company',
        value: this.company.value,
      });
    }

    const contactParams = {
      firstName: this.fname.value,
      lastName: this.lname.value,
      email: this.email.value,
      companyName: this.company.value,
      category: this.category.value,
      message: this.message.value,
      type: localStorage.getItem('clientType') === '1' ? 'individual' : 'business',
      region: localStorage.getItem('region') || 'all',
      currency: localStorage.getItem('currency') || 'eur',
      language: localStorage.getItem('lang') || 'en',
      marketingConsent: this.marketingConsent.value || false,
      privacyConsent: this.privacyConsent.value,
    };
    try {
      this.hubspotService.submitForm(hubspotParams).subscribe({
        next: (response) => console.log(response),
        error: (error: HttpErrorResponse) =>
          this.showError(
            'Something went wrong',
            this.translate.instant('warning')
          ),
      });
      this.contactService.addContact(contactParams).subscribe({
        next: (response) => {
          this.identify('generate_lead', 'contact');
          this.popup = document.getElementById('popup1');
          this.popup.classList.add('overlayShow');
          this.form.reset();
          this.showSuccess(
            this.translate.instant('subscribeProject.description'),
            this.translate.instant('subscribeProject.title')
          );
        },
        error: (error: HttpErrorResponse) =>
          this.showError(
            this.translate.instant('errorMessage'),
            this.translate.instant('warning')
          ),
      });
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  close(): void {
    this.popup = document.getElementById('popup1');
    this.popup.classList.remove('overlayShow');
  }
}
