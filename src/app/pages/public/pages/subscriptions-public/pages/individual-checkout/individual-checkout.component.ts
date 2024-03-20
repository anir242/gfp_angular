import {Component, OnInit, ViewChild, AfterViewInit, HostListener, ElementRef} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import { SubscriptionsService } from '../../../../../../_services/subscriptions/subscriptions.service';
import {UsersService} from '../../../../../../_services/users/users.service';
import { SubscriptionTypesService } from '../../../../../../_services/subscriptions/subscription-types.service';
import { MainSubscriptionsService } from '../../../../../../_services/subscriptions/main-subscriptions.service';
import { AuthenticationService } from '../../../../../../_services/authentication/authentication.service';
import {Response} from '../../../../../../_models/api/response';
import {SubscriptionTypesInterface} from '../../../../../../_models/api/subscriptions/subscription-types-interface';
import {SubscriptionTypeGroupsInterface} from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {UsersInterface} from '../../../../../../_models/api/users/users-interface';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {MatStepper} from '@angular/material/stepper';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import { CartInterface } from '../../../../../../_models/cart-interface';
import { LoginInterface } from '../../../../../../_models/api/login-interface';
import { StorageName } from '../../../../../../_models/components/storage-name';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {AuthService} from '../../../../../../_services/_base/auth.service';
import { RoutingTypes } from '../../../../../../_models/components/routing-types';
import { TagTypes } from '../../../../../../_models/components/tag-types';
import { NewsletterService } from 'src/app/_services/public/newsletter.service';

@Component({
  selector: 'app-individual-checkout',
  templateUrl: './individual-checkout.component.html',
  styleUrls: ['./individual-checkout.component.scss']
})
export class IndividualCheckoutComponent extends BaseComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  cartTypes = CartTypes;
  slug: string;
  updated = false;
  newAccount = true;
  authenticated = false;
  subTypeId: string;
  subscriptionType: SubscriptionTypesInterface;
  subscriptionTypeGroup: SubscriptionTypeGroupsInterface;
  @ViewChild('checkoutForm') checkoutForm: ElementRef;
  @ViewChild('checkoutSummary') checkoutSummary: ElementRef;
  scrollLimit: number = 0;
  user: UsersInterface;
  subType = new UntypedFormGroup({
    id: new UntypedFormControl('', []),
    price: new UntypedFormControl('', []),
  });
  account = new UntypedFormGroup({
    login: new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
      ]),
    }),
    signup: new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8),]),
      cPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(8),]),
    }),
  });
  checkout = new UntypedFormGroup({

    about: new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
    }),
    billingAddress: new UntypedFormGroup({
      sameAsCompany: new UntypedFormControl(false),
      country: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      streetHouse: new UntypedFormControl('', [Validators.required]),
      apartment: new UntypedFormControl(''),
      zip: new UntypedFormControl('', [Validators.required]),
    }),
    paymentMethods: new UntypedFormGroup({
      code: new UntypedFormControl(''),
      cardType: new UntypedFormControl(''),
      cardName: new UntypedFormControl(''),
      cardNumber: new UntypedFormControl(''),
      cardCCV: new UntypedFormControl(''),
      cardExpireDate: new UntypedFormControl(''),
    }),
    inviteCode: new UntypedFormControl(''),
    agreeTermsOfUse: new UntypedFormControl('', [Validators.requiredTrue]),
    marketingConsent: new UntypedFormControl(false),
  });

  constructor(
    public route: ActivatedRoute,
    private auth: AuthService,
    private cartService: OrderSummaryService,
    private authenticationService: AuthenticationService,
    private subscriptionTypesService: SubscriptionTypesService,
    private subscriptionService: MainSubscriptionsService,
    private userService: UsersService,
    private newsletterService: NewsletterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.isLoggedIn().then();
  }

  getQueryParams = () => {
    this.route.params.subscribe((params) => {
      this.slug = params.slug;
      if (this.slug) {
        this.getSubscription(this.slug).then();
      } else {
        this.getSubscriptionTypes().then();
      }
    });
  }

  isLoggedIn = async () => {
    if (this.auth.isAuthenticated()) {
      this.authenticated = true;
      const controls = ["email", "password", "cPassword"];
      controls.forEach((value: string) => {
        this.signup.controls[value].clearValidators();
        this.signup.controls[value].updateValueAndValidity();
      });
      await this.getUser();
    }
  }

  getUser = async () => {
    this.ngxService.start('users');
    try {
      const userId = localStorage.getItem(StorageName.id);
      const response: Response<UsersInterface> = await this.userService.getUserById(userId);
      if (response?.success) {
        this.user = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('users');
  }

  setUser() {
    const about = this.checkout.get('about');
    if (about) {
      about.get('firstname').setValue(this.user.firstname);
      about.get('lastname').setValue(this.user.lastname);
    }
  }

  getSubscriptionTypes = async () => {
    const params = {
      type: 'individual'
    };
    try {
      const response: Response<SubscriptionTypeGroupsInterface> = await this.subscriptionService.getMainSubscriptionBySlug('individual');
      if (response?.success) {
        this.subscriptionTypeGroup = response.data;
        this.setSubscriptionType(this.subscriptionTypeGroup.subscriptionsTypes[0]);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  getSubscription = async (slug: string) => {
    try {
      const response: Response<SubscriptionTypesInterface> = await this.subscriptionTypesService.findOne(slug);
      if (response?.success) {
        this.subscriptionType = response.data;
        this.subTypeId = this.subscriptionType.slug;
        this.setCart();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  check(event): void {
    this.setCart(event)
  }

  setSubscriptionType(subType: SubscriptionTypesInterface, event?: any) {
    if (this.subTypeId !== subType.slug) {
      this.subscriptionType = subType;
      this.subTypeId = subType.slug;
      const radios = document.querySelectorAll('.mat-radio-button');
      radios?.forEach((radio) => {
        const radioValue = radio.getAttribute('ng-reflect-value');
        if (radioValue == this.subTypeId) {
          radio.classList.add('mat-radio-checked');
        } else {
          radio.classList.remove('mat-radio-checked');
        }
      });
      this.trackCheckout('select_item');
      if (subType.selectedPrice) {
        this.setCart({
          id: subType.selectedPrice.price.stripeId,
          amount: subType.selectedPrice.price.amount,
          months: subType.selectedPrice.price.frequency === '1Y' ? 12 : 1
        });
      } else {
        this.setCart();
      }
    }
  }

  setCart(price?: any): void {
    const item: CartInterface = {
      id: this.subscriptionType.id,
      internalType: CartTypes.SUBSCRIPTION,
      name: this.subscriptionType.name,
      subscriptions: [{
        id: this.subscriptionType.id,
        quantity: 1,
        name: this.subscriptionType.name,
        projects: this.subscriptionType.subscriptionTypeValues,
        cost: price?.id ? price.amount : price?.months === 12 ? this.subscriptionType.costYearly : this.subscriptionType.costMonthly,
        priceId: price?.id,
        frequency: price?.months === 12 ? 'year' : 'month'
      }]
    };
    this.cartService.clearCartByType('subscriptions');
    this.cartService.addToCart(item);
  }

  trackCheckout(event): void {
    const totals: any = this.cartService.getTotal();
    this.track(event, [
      this.asProduct(
        this.subscriptionType.id, this.subscriptionType.name, 'EUR', this.subscriptionType.costMonthly, 
        this.cartService.cartItems.length, this.subscriptionType.slug, 
        'subscriptions', 'individual', 'subscriptions', 'Subscriptions'
      )
    ]);
  }

  setUpdate = (event: StepperSelectionEvent) => {
    this.updated = event.selectedIndex !== 2;
  }

  get login(): UntypedFormGroup {
    return this.account.get('login') as UntypedFormGroup;
  }

  get signup(): UntypedFormGroup {
    return this.account.get('signup') as UntypedFormGroup;
  }

  get about(): UntypedFormGroup {
    return this.checkout.get('about') as UntypedFormGroup;
  }

  get agreeTermsOfUse(): UntypedFormControl {
    return this.checkout.get('agreeTermsOfUse') as UntypedFormControl;
  }

  get marketingConsent(): UntypedFormControl {
    return this.checkout.get('marketingConsent') as UntypedFormControl;
  }

  get inviteCode(): UntypedFormControl {
    return this.checkout.get('inviteCode') as UntypedFormControl;
  }

  get paymentMethods(): UntypedFormGroup {
    return this.checkout.get('paymentMethods') as UntypedFormGroup;
  }

  get billingAddress(): UntypedFormGroup {
    return this.checkout.get('billingAddress') as UntypedFormGroup;
  }

  get firstname(): UntypedFormControl {
    return this.about.get('firstname') as UntypedFormControl;
  }
  get lastname(): UntypedFormControl {
    return this.about.get('lastname') as UntypedFormControl;
  }

  get email(): UntypedFormControl {
    return this.signup?.get('email') as UntypedFormControl;
  }

  get password(): any {
    return this.signup?.get('password');
  }

  get cPassword(): any {
    return this.signup?.get('cPassword');
  }

  update = () =>  {
    this.updated = true;
    this.signupV2();
  }

  toLogIn = () => {
    this.newAccount = false;
  }

  toSignUp = () => {
    this.newAccount = true;
  }

  authenticate = async () => {
    //this.submit.disabled = true;
    if (this.login.valid) {
      this.ngxService.start();
      try {
        const response: Response<LoginInterface> = await this.authenticationService.login(this.login.value);
        this.ngxService.stop();
        if (response?.success === true) {
          const subs = localStorage.getItem(StorageName.businessEmployees);
          const subsPioneer = localStorage.getItem(StorageName.businessPioneer);
          const clientType = localStorage.getItem('clientType');
          const termly = localStorage.getItem('TERMLY_API_CACHE')
          localStorage.clear();
          localStorage.setItem('clientType', clientType)
          localStorage.setItem('TERMLY_API_CACHE', termly);
          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          localStorage.setItem(StorageName.username, response.data.firstname);
          const user = response.data;
          this.user = user;
          localStorage.setItem(StorageName.businessEmployees, subs);
          localStorage.setItem(StorageName.businessPioneer, subsPioneer);
          this.identify('login', 'GFP');
          this.loggedUserService.logged.emit();
        } else {
          this.showErrorResponse(response);
          this.stepper.selectedIndex = 0;
        }
      } catch (e) {
        this.ngxService.stop();
        this.logError(e);
        this.showErrorResponse(e);
        this.stepper.selectedIndex = 0;
      }
    }
    //this.submit.disabled = false;
  }

  async signupV2(): Promise<void> {
    if (this.signup.valid && !this.auth.isAuthenticated()) {
      this.ngxService.start();
      let response: Response<LoginInterface>;
      try {
        response = await this.authenticationService.signupV2({
          email: this.email.value,
          password: this.password.value,
          type: 'individual',
          firstname: this.firstname?.value,
          lastname: this.lastname?.value,
          inviteCode: this.inviteCode?.value,
          region: localStorage.getItem('region') || 'all',
          currency: localStorage.getItem('currency') || 'eur',
          language: localStorage.getItem('lang') || 'en',
          marketingConsent: this.marketingConsent?.value,
          privacyConsent: true //true because without this consent the user cannot do the checkout
        });
        this.ngxService.stop();
        if (response?.success === true) {
          this.user = response.data;
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.username, response.data.firstname);
          this.identify('sign_up', 'GFP');
        } else {
          this.showErrorResponse(response);
          this.stepper.selectedIndex = 0;
        }
      } catch (e) {
        this.ngxService.stop();
        this.logError(e);
        this.showErrorResponse(e.error);
        this.stepper.selectedIndex = 0;
      }
    } else {
      this.signup.markAllAsTouched();
      if (!this.auth.isAuthenticated) {
        this.stepper.selectedIndex = 0;
      }
    }
  }

  subscribeUpdate = async (email: string, tags: string[]) => {
    const params: any = {
      email: email,
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

  @HostListener('window:scroll', ['$event'])
  scrollSummary(event: any) {
    this.scrollLimit = this.checkoutForm?.nativeElement.offsetTop + this.checkoutForm?.nativeElement.offsetHeight;
    let position = window.pageYOffset;
    if (this.checkoutSummary) {
      position += this.checkoutSummary.nativeElement.offsetHeight + 150;
      if (position > this.scrollLimit) {
        this.checkoutSummary.nativeElement.classList.remove('fixed');
        this.checkoutSummary.nativeElement.classList.add('absolute');
      } else {
        this.checkoutSummary.nativeElement.classList.remove('absolute');
        this.checkoutSummary.nativeElement.classList.add('fixed');
      }
    }
  }
}
