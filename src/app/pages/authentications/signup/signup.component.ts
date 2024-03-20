import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../_base/base/base.component';
import {AbstractControl, AsyncValidatorFn, FormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_services/authentication/authentication.service';
import {Response} from '../../../_models/api/response';
import {LoginInterface} from '../../../_models/api/login-interface';
import {MatButton} from '@angular/material/button';
import Validation from '../../../components/validator/input-equals';
import {StorageName} from 'src/app/_models/components/storage-name';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {RoutingTypes} from '../../../_models/components/routing-types';
import {UserTypes} from '../../../_models/components/user-types';
import {GiftCardRecipientInterface} from '../../../_models/api/public/gift-card-recipient-interface';
import {GiftService} from '../../../_services/public/gift.service';
import {environment} from '../../../../environments/environment';
import {FlowTypes} from '../../../_models/components/flow-types';
import {parallel} from '@angular/cdk/testing';
import {AuthService} from '../../../_services/_base/auth.service';
import { UsersService } from '../../../_services/users/users.service';
import { NewsletterService } from 'src/app/_services/public/newsletter.service';
import { TagTypes } from 'src/app/_models/components/tag-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit {
  @ViewChild('submit', {static: true}) submit: MatButton;
  showSocials = environment.showSocialsLogin;

  fromWhichFlow: string;
  type: string;

  userTypes = UserTypes;
  userType: string;
  giftCardRecipientInterface: GiftCardRecipientInterface;
  private slug: string;

  showBusiness = environment.showBusiness;
  routingTypes = RoutingTypes;
  planId: string;
  projectSlug: string;
  selection = 0;
  isLoggedin: boolean;
  giftToken: string;
  subscriptionData = new UntypedFormGroup({
    aboutYou: new UntypedFormGroup({
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
    }),
    user: new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8), ]),
      cPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8), ]),
      remember: new UntypedFormControl(false)
    }),
    aboutYourCompany: new UntypedFormGroup({
      companyName: new UntypedFormControl(''),
      vatNumber: new UntypedFormControl(''),
      city: new UntypedFormControl(''),
      street: new UntypedFormControl(''),
      country: new UntypedFormControl(''),
      apartment: new UntypedFormControl(''),
      zip: new UntypedFormControl(''),
      logo: new UntypedFormControl(''),
    }),
    remember: new UntypedFormControl(false),
    marketingConsent: new UntypedFormControl(false),
    privacyConsent: new UntypedFormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private giftService: GiftService,
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UsersService,
    private newsletterService: NewsletterService,
    public auth: AuthService

  ) {
    super();
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.password.addValidators(
      Validation.match(this.cPassword)
    );
    this.cPassword.addValidators(
      Validation.match(this.password)
    );
    this.getGiftCardUsers().then();
    this.showCustomAlert(this.route, 'share.inviteAccepted', 'share.signup');
    this.isLoggedIn().then();
  }

  async isLoggedIn(): Promise<void> {
    if (this.auth.isAuthenticated()) {
      if (this.giftToken) {
        await this.userService.redeemGifts();
        const firstName = this.giftCardRecipientInterface.recipientName.split(' ')[0];
        const lastName = this.giftCardRecipientInterface.recipientName.split(' ')[1];
        this.subscribeToMailchimp(this.giftCardRecipientInterface.recipientEmail, firstName, lastName, [TagTypes.RECEIVER]);
      }
      this.router.navigate([RoutingTypes.ADMIN]).then();
    }
  }


  getQueryParams(): void {
    this.route.queryParams.subscribe((params) => {

      this.fromWhichFlow = params.from;
      this.type = params.type;
      switch (this.fromWhichFlow) {
        case FlowTypes.subscriptions: {
          switch (this.type) {
            case UserTypes.individual:
              this.userType = UserTypes.individual;
              this.slug = params.slug;
              break;
            case UserTypes.business:
              this.userType = UserTypes.business;
              this.slug = params.slug;
              break;
            default:
              this.userType = UserTypes.individual;
              break;
          }
          break;
        }
        case FlowTypes.singleDonation: {
          this.planId = params.id;
          this.projectSlug = params.slug;
          break;
        }
        default:
          if (params.giftToken){
            this.giftToken = params.giftToken;
          }
          this.userType = UserTypes.individual;
          break;
      }
    });
  }

  subscribeToMailchimp = async (email: string, fname: string, lname: string,tags: string[]) => {
    const params: any = {
      email: email,
      tags: tags,
      firstName: fname,
      lastName: lname,
    };
    try {
      const response: Response<any> =
        await this.newsletterService.subscribeNewsletter(params);
      if (response?.success) {
        this.showSuccess(
          this.translate.instant('authentication.giftRedeemedDescription'),
          this.translate.instant('authentication.giftRedeemedTitled')
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  subscribeUpdate = async (email: string, tags: string[]) => {
    if (this.email.valid) {
      const params: any = {
        email: this.email.value,
        tags: tags
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

  setType(event: any): void {
    this.selection = event.value;
  }

  async logIn(): Promise<void> {
    switch (this.fromWhichFlow) {
      case FlowTypes.subscriptions:
        await this.router.navigate([RoutingTypes.LOGIN], {
          queryParams: {
            type: this.type,
            from: this.fromWhichFlow,
            slug: this.slug
          }
        });

        break;
      case FlowTypes.singleDonation:
        await this.router.navigate([RoutingTypes.LOGIN], {
          queryParams: {
            from: this.fromWhichFlow,
            id: this.planId,
            slug: this.projectSlug,
          }});
        break;
      default:
        if (this.giftToken){
          await this.router.navigate([RoutingTypes.LOGIN], {queryParams: {giftToken: this.giftToken}});
        }else{
          await this.router.navigate([RoutingTypes.LOGIN]);
        }
        break;
    }

  }


  async signupV2(): Promise<void> {
    if (this.subscriptionData.valid) {
      this.ngxService.start();
      let response: Response<LoginInterface>;
      try {
        if (this.userType === UserTypes.individual) {
          response = await this.authenticationService.signupV2({
            email: this.email.value,
            password: this.password.value,
            type: this.userType,
            firstname: this.firstName.value,
            lastname: this.lastName.value,
            region: localStorage.getItem('region') || 'all',
            currency: localStorage.getItem('currency') || 'eur',
            language: localStorage.getItem('lang') || 'en',
            marketingConsent: this.marketingConsent.value,
            privacyConsent: this.privacyConsent.value
          });
        }

        if (this.userType === UserTypes.business) {
          response = await this.authenticationService.signupV2({
            email: this.email.value,
            password: this.password.value,
            type: this.userType,
            firstname: this.firstName.value,
            lastname: this.lastName.value,
            vatNumber: this.vatNumber.value,
            companyName: this.companyName.value,
            country: this.country.value,
            street: this.street.value,
            apartment: this.apartment.value,
            city: this.city.value,
            zipCode: this.zip.value,
            region: localStorage.getItem('region') || 'all',
            currency: localStorage.getItem('currency') || 'eur',
            language: localStorage.getItem('lang') || 'en',
            marketingConsent: this.marketingConsent.value,
            privacyConsent: this.privacyConsent.value
          });
        }
        this.ngxService.stop();
        if (response?.success === true) {

          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.username, response.data.firstname);
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          //mootrack('identify', response.data.email, response.data.firstname + ' ' + response.data.lastname);
          if (this.giftToken) {
            await this.userService.redeemGifts();
            const additionalTag = localStorage.getItem(StorageName.clientType) === '1' ? TagTypes.INDIVIDUAL : TagTypes.BUSINESS;
            this.subscribeToMailchimp(response.data.email, response.data.firstname, response.data.lastname, [TagTypes.RECEIVER, additionalTag])
          }
          switch (this.fromWhichFlow) {
            case FlowTypes.subscriptions:
              if (this.type === UserTypes.individual) {
                await this.router.navigate([RoutingTypes.INDIVIDUAL_CHECKOUT.replace(':id', this.slug)]);
              } else {
                await this.router.navigate([RoutingTypes.BUSINESS_CHECKOUT.replace(':id', this.slug)]);
              }
              break;
            case FlowTypes.singleDonation:
              await this.router.navigate([
                RoutingTypes.PROJECTS_PUBLIC,
                this.projectSlug,
                RoutingTypes.SINGLE_DONATIONS
              ], {queryParams: {id: this.planId}});
              break;
            default:
              await this.router.navigate([RoutingTypes.ADMIN]);
              break;
          }
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.ngxService.stop();
        this.logError(e);
        this.showErrorResponse(e.error);
      }
    } else {
      this.user.markAllAsTouched();
    }
  }

  get aboutYou(): UntypedFormGroup {
    return this.subscriptionData.get('aboutYou') as UntypedFormGroup;
  }

  get aboutYourCompany(): UntypedFormGroup {
    return this.subscriptionData.get('aboutYourCompany') as UntypedFormGroup;
  }

  get user(): UntypedFormGroup {
    return this.subscriptionData.get('user') as UntypedFormGroup;
  }

  get remember(): UntypedFormGroup {
    return this.subscriptionData.get('remember') as UntypedFormGroup;
  }

  get marketingConsent(): UntypedFormGroup {
    return this.subscriptionData.get('marketingConsent') as UntypedFormGroup;
  }

  get privacyConsent(): UntypedFormGroup {
    return this.subscriptionData.get('privacyConsent') as UntypedFormGroup;
  }

  get companyName(): UntypedFormControl {
    return this.aboutYourCompany.get('companyName') as UntypedFormControl;
  }

  get vatNumber(): UntypedFormControl {
    return this.aboutYourCompany.get('vatNumber') as UntypedFormControl;
  }

  get country(): UntypedFormControl {
    return this.aboutYourCompany.get('country') as UntypedFormControl;
  }

  get city(): UntypedFormControl {
    return this.aboutYourCompany.get('city') as UntypedFormControl;
  }

  get street(): UntypedFormControl {
    return this.aboutYourCompany.get('street') as UntypedFormControl;
  }

  get apartment(): UntypedFormControl {
    return this.aboutYourCompany.get('apartment') as UntypedFormControl;
  }

  get zip(): UntypedFormControl {
    return this.aboutYourCompany.get('zip') as UntypedFormControl;
  }

  get firstName(): UntypedFormControl {
    return this.aboutYou?.get('firstName') as UntypedFormControl;
  }

  get lastName(): UntypedFormControl {
    return this.aboutYou?.get('lastName') as UntypedFormControl;
  }

  get email(): UntypedFormControl {
    return this.user?.get('email') as UntypedFormControl;
  }

  get password(): any {
    return this.user?.get('password');
  }

  get cPassword(): any {
    return this.user?.get('cPassword');
  }

  checkPasswords(group: UntypedFormGroup): any {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {mismatch: true};
  }

  userOrBusiness(): void {
    if (this.fromWhichFlow === 'subscriptions') {
      if (this.userType !== this.type) {
        this.showError(
          this.translate.instant('signup.subscriptionWarnType'),
          this.translate.instant('warning'),
        );
        setTimeout(() => {
          this.userType = this.type;
        }, 0);
      }
    }
    if (this.userType === UserTypes.individual) {
      localStorage.setItem(StorageName.clientType, '1');
      this.companyName.clearValidators();
      this.vatNumber.clearValidators();
      this.city.clearValidators();
      this.street.clearValidators();
      this.country.clearValidators();
      this.apartment.clearValidators();
      this.zip.clearValidators();
    } else {
      localStorage.setItem(StorageName.clientType, '2');
      this.companyName.addValidators([Validators.required]);
      this.vatNumber.addValidators([Validators.required]);
      this.city.addValidators([Validators.required]);
      this.street.addValidators([Validators.required]);
      this.country.addValidators([Validators.required]);
      this.apartment.addValidators([Validators.required]);
      this.zip.addValidators([Validators.required]);
    }
  }

  async getGiftCardUsers(): Promise<void> {
    if (this.giftToken) {
      try {
        const response: Response<GiftCardRecipientInterface> = await this.giftService.getGiftCardUsersFromRegistration(this.giftToken);
        if (response?.success) {
          this.giftCardRecipientInterface = response.data;
          this.email.patchValue(this.giftCardRecipientInterface.recipientEmail);
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
    }
  }
}
