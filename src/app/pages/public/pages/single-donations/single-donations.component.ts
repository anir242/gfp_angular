import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { BaseComponent } from '../../../_base/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { RoutingTypes } from '../../../../_models/components/routing-types';
import { Response } from '../../../../_models/api/response';
import { CalendlyPopupComponent } from 'src/app/pages/public/components/calendly-popup/calendly-popup.component';
import { SinglePaymentPacksInterface } from '../../../../_models/api/public/single-payment-packs-interface';
import { SinglePaymentPacksService } from '../../../../_services/public/single-payment-packs.service';
import { SinglePaymentsInterface } from '../../../../_models/api/public/single-payments-interface';
import { CartTypes } from '../../../../_models/components/cart-types';
import { TagTypes } from '../../../../_models/components/tag-types';
import { OrderSummaryInterface } from '../../../../_models/order-summary-interface';
import { MatStepper } from '@angular/material/stepper';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { LedgerService } from '../../../../_services/ledger/ledger.service';
import { CartInterface } from '../../../../_models/cart-interface';
import { OrderSummaryService } from '../../../../_services/public/local/order-summary.service';
import { StorageName } from '../../../../_models/components/storage-name';
import { UsersInterface } from '../../../../_models/api/users/users-interface';
import { UsersService } from '../../../../_services/users/users.service';
import { UserTypes } from '../../../../_models/components/user-types';
import { ProviderInterface } from '../../../../_models/api/ledger/provider-interface';
import { ProjectsInterface } from '../../../../_models/api/projects/projects-interface';
import { AuthenticationService } from '../../../../_services/authentication/authentication.service';
import { LoginInterface } from '../../../../_models/api/login-interface';
import { AuthService } from '../../../../_services/_base/auth.service';
import { NewsletterService } from 'src/app/_services/public/newsletter.service';

@Component({
  selector: 'app-single-donations',
  templateUrl: './single-donations.component.html',
  styleUrls: ['./single-donations.component.scss'],
})
export class SingleDonationsComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('donationForm') donationForm: ElementRef;
  @ViewChild('donationSummary') donationSummary: ElementRef;
  cartInterface: CartInterface;
  id: string;
  unit: string;
  initialOpen2 = false;
  updated1 = false;
  updated2 = false;
  showSdi = false;
  projectSlug: string;
  cartItem: OrderSummaryInterface;
  user: UsersInterface;
  summaryItem: SinglePaymentsInterface;
  cartTypes = CartTypes;
  buttonDisabled: boolean = true;
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  x = window.matchMedia('(max-width: 767px)');
  items: any;
  action: string;
  offset: boolean = false;
  providers: ProviderInterface[];
  providerId: string;
  provider: ProviderInterface;
  project: ProjectsInterface;
  projectId: string;
  scrollLimit: number = 0;
  newAccount = true;
  authenticated = false;
  timeOutIds = [];
  value = new UntypedFormControl(10, [Validators.min(10)]);
  account = new UntypedFormGroup({
    login: new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
      ]),
      password: new UntypedFormControl('', [Validators.required]),
    }),
    signup: new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      cPassword: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
      inviteCode: new UntypedFormControl(''),
    }),
    marketingConsent: new UntypedFormControl(false),
  });
  subscriptionData = new UntypedFormGroup({
    yourBillingAddress: new UntypedFormGroup({
      sameAsCompany: new UntypedFormControl(false),
      country: new UntypedFormControl('', [Validators.required]),
      sdi: new UntypedFormControl(''),
      city: new UntypedFormControl('', [Validators.required]),
      streetHouse: new UntypedFormControl('', [Validators.required]),
      apartment: new UntypedFormControl('', [Validators.required]),
      zip: new UntypedFormControl(''),
    }),
    paymentMethods: new UntypedFormGroup({
      code: new UntypedFormControl(''),
      cardType: new UntypedFormControl(''),
      cardName: new UntypedFormControl(''),
      cardNumber: new UntypedFormControl(''),
      cardCCV: new UntypedFormControl(''),
      cardExpireDate: new UntypedFormControl(''),
    }),
    agreeTermsOfUse: new UntypedFormControl('', [Validators.requiredTrue]),
  });

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private authenticationService: AuthenticationService,
    private singlePaymentPacksService: SinglePaymentPacksService,
    private cartService: OrderSummaryService,
    private usersService: UsersService,
    private ledgerService: LedgerService,
    private newsletterService: NewsletterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.clearCart();
    this.getId();
    if (this.offset) {
      this.getProviders();
    } else {
      if (this.projectSlug) {
        this.getPayments().then();
      }
    }
    this.isLoggedIn();
  }

  ngOnDestroy() {
    this.timeOutIds.forEach((id) => clearTimeout(id));
  }

  clearCart(): void {
    this.cartService.clearCartByType(CartTypes.SINGLE_DONATION);
    this.cartService.clearCartByType(CartTypes.GIFT);
    this.checkProjectsLimit();
    this.cartService.clearCartByType(CartTypes.SINGLE_DONATION);
  }

  getAction(): void {
    this.action = this.translate.instant(
      'singleDonations.' + this.singlePaymentPacksInterface.unit.slug + 'Action'
    );
  }

  isLoggedIn = async () => {
    if (this.auth.isAuthenticated()) {
      this.authenticated = true;
      //this.stepper.selectedIndex = 1;
      const controls = ['email', 'password', 'cPassword'];
      controls.forEach((value: string) => {
        this.signup.controls[value].clearValidators();
        this.signup.controls[value].updateValueAndValidity();
      });
      await this.getUserInfo();
    }
  };

  getUserInfo = async () => {
    const userId = localStorage.getItem(StorageName.id);
    try {
      const response: Response<UsersInterface> =
        await this.usersService.getUserById(userId);
      if (response?.success) {
        this.user = response.data;
        this.showByUserType();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  getProviders = async () => {
    try {
      const response: Response<ProviderInterface[]> =
        await this.ledgerService.getProviders();
      if (response?.success) {
        this.providers = response.data;
        if (this.providers?.length > 0) {
          for (let i = 0; i < this.providers.length; i++) {
            this.provider = this.providers[i];
            this.setLang();
          }
          this.providerId = this.provider.id;
          if (this.provider.packs?.length > 0) {
            this.project = this.provider.packs[0].project;
            this.projectSlug = this.project?.slug;
            this.projectId = this.project?.id;
          }
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.provider.description = this.provider.description_it;
    }
  }

  ngAfterViewInit(): void {
    this.scrollLimit =
      this.donationForm?.nativeElement.offsetTop +
      this.donationForm?.nativeElement.offsetHeight;
    this.stepper._getIndicatorType = () => 'number';
  }

  showByUserType(): void {
    switch (this.user.type) {
      case UserTypes.individual: {
        this.showSdi = false;
        break;
      }
      case UserTypes.business: {
        this.showSdi = true;
        this.aboutYourCompany.get('sdi').setValidators(Validators.required);
        break;
      }
    }
  }

  checkProjectsLimit(): void {
    this.cartService.clearCartByType(CartTypes.SINGLE_DONATION);
  }

  getId(): void {
    this.projectSlug = this.route.snapshot.params.slug;
    if (this.projectSlug) {
      this.route.queryParams.subscribe((params) => {
        this.id = params.id;
        if (this.id?.startsWith('select-')) {
        }
      });
    } else {
      this.offset = true;
    }
  }

  setPayment = async () => {
    if (this.singlePaymentPacksInterface) {
      if (this.singlePaymentPacksInterface.singlePayments) {
        if (this.singlePaymentPacksInterface.singlePayments.length > 0) {
          if (this.id?.startsWith('select-')) {
            const amount = this.id.split('select-')[1];
            if (amount) {
              this.value.patchValue(amount);
            }
            const payment =
              await this.singlePaymentPacksInterface.singlePayments.filter(
                (x) => x.price == 0
              )[0];
            if (payment) {
              this.id = payment.id;
            }
          } else {
            this.id = this.singlePaymentPacksInterface.singlePayments[0].id;
          }
        }
      }
    }
  };

  setCart = async () => {
    this.summaryItem =
      this.singlePaymentPacksInterface.singlePayments.filter(
        (x) => x.id === this.id
      )[0] ?? this.singlePaymentPacksInterface.singlePayments[0];
    if (!this.summaryItem) {
      this.summaryItem = {
        id: '',
        quantity: 1,
        price: 1
      }
    }
    this.cartInterface = {
      id: this.singlePaymentPacksInterface.id,
      internalType: CartTypes.SINGLE_DONATION,
      name: this.offset ? "CO2 Offset" : "Donation",
      singleDonation: {
        unit: this.singlePaymentPacksInterface.unit,
        project: this.singlePaymentPacksInterface.project,
        paymentPack: this.summaryItem,
      },
    };
    this.cartService.addToCart(this.cartInterface);
    this.getAction();
    this.startCheckout();
  };

  setDisabled(event): void {
    this.buttonDisabled = !(this.id || event.index == 1);
  }

  getPayments = async () => {
    this.ngxService.start();
    try {
      const response: Response<SinglePaymentPacksInterface> =
        await this.singlePaymentPacksService.getPackBySlug(this.projectSlug);
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
        this.setPayment();
        if (this.id) {
          this.clearCart();
          await this.setCart();
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      if (!this.offset) {
        await this.router.navigate([RoutingTypes.PROJECTS_PUBLIC]);
      }
      this.showErrorResponse(e);
    }
    this.ngxService.stop();
  };

  selectProduct(id: string, price: number): void {
    this.track('select_item', [
      this.asProduct(
        id,
        this.singlePaymentPacksInterface.project?.name + ' Donation',
        'EUR',
        price,
        1,
        'EUR' + price.toString(),
        'singlePayments',
        this.singlePaymentPacksInterface.project?.type?.slug,
        'singlePayments',
        'Single Payments'
      ),
    ]);
  }

  startCheckout(): void {
    const totals: any = this.cartService.getTotal();
    this.track('begin_checkout', [
      this.asProduct(
        this.id,
        this.singlePaymentPacksInterface.project?.name + ' Donation',
        'EUR',
        totals.totalCost,
        this.cartService.cartItems.length,
        this.id,
        'singlePayments',
        this.singlePaymentPacksInterface.project?.type?.slug,
        'singlePayments',
        'Single Payments'
      ),
    ]);
  }

  async update1(): Promise<void> {
    if (this.offset) {
      this.displayPopup();
    }
    this.updated1 = true;
    this.initialOpen2 = true;
    if (this.summaryItem && this.summaryItem.id != null) {
      this.selectProduct(this.summaryItem?.id, this.summaryItem?.price);
    }
    if (this.summaryItem?.id == null) {
      let res: SinglePaymentsInterface = (
        await this.singlePaymentPacksService.createSinglePaymentObject({
          packId: this.summaryItem.packId,
          price: this.summaryItem.price,
          status: 'inactive',
          quantity: this.summaryItem.quantity,
        })
      ).data;
      this.summaryItem = res;
      this.id = res.id;
      this.cartInterface = this.cartService.switchItem(
        this.cartInterface.singleDonation.paymentPack,
        this.summaryItem,
        CartTypes.SINGLE_DONATION
      );
      this.selectProduct(this.summaryItem?.id, this.summaryItem?.price);
    }
  }

  getBackground = (project: ProjectsInterface): any => {
    const bgJson: any = {};
    if (project.miniatureImageId) {
      bgJson.background = `url(${project.miniatureImage.url})`;
    } else {
      bgJson.background = `url(${project.image.url})`;
    }
    bgJson['background-size'] = 'cover';
    bgJson['background-position'] = 'center center';
    bgJson['background-repeat'] = 'no-repeat';
    return bgJson;
  };

  setProject(item: SinglePaymentPacksInterface): void {
    this.project = item.project;
    this.projectId = item.projectId;
    this.projectSlug = item.project?.slug;
    //this.getPayments().then();
    this.singlePaymentPacksInterface = item;
    if (item.singlePayments?.length > 0) {
      this.id = item.singlePayments[0].id;
    }
  }

  update2(): void {
    this.cartService.addBillingData(
      this.aboutYourCompany.get('sameAsCompany').value,
      this.aboutYourCompany.get('country').value,
      this.aboutYourCompany.get('sdi').value,
      this.aboutYourCompany.get('city').value,
      this.aboutYourCompany.get('streetHouse').value,
      this.aboutYourCompany.get('apartment').value,
      this.aboutYourCompany.get('zip').value
    );
    this.updated2 = true;
  }

  updateStatus(event): void {
    if (!this.offset) {
      if (event.selectedIndex === 0) {
        this.updated1 = false;
      } else {
        this.updated1 = true;
      }

      if (event.selectedIndex === 1) {
        this.initialOpen2 = true;
        this.updated2 = false;
      } else {
        this.updated2 = true;
      }
    }
  }

  check(event): void {
    this.summaryItem = this.singlePaymentPacksInterface.singlePayments.filter(
      (x) => x.id === event
    )[0];
    this.cartInterface = this.cartService.switchItem(
      this.cartInterface.singleDonation.paymentPack,
      this.summaryItem,
      CartTypes.SINGLE_DONATION
    );
    this.id = event;
  }

  checkCustom(event) {
    this.summaryItem = event;
    if (this.cartInterface) {
      this.cartInterface = this.cartService.switchItem(
        this.cartInterface.singleDonation.paymentPack,
        this.summaryItem,
        CartTypes.SINGLE_DONATION
      );  
    }
  }

  setContainer(): any {
    if (this.x.matches) {
      return 'container-fluid';
    }
    return 'container';
  }

  goToProject(item: SinglePaymentPacksInterface) {
    this.router.navigate(['projects', item.project?.slug]);
  }

  setUpdate = (event: StepperSelectionEvent) => {
    this.updated1 = event.selectedIndex !== 1;
    this.updated2 = event.selectedIndex !== 2;
  };

  get login(): UntypedFormGroup {
    return this.account.get('login') as UntypedFormGroup;
  }

  get signup(): UntypedFormGroup {
    return this.account.get('signup') as UntypedFormGroup;
  }

  get firstname(): UntypedFormControl {
    return this.signup?.get('firstname') as UntypedFormControl;
  }
  get lastname(): UntypedFormControl {
    return this.signup?.get('lastname') as UntypedFormControl;
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

  get inviteCode(): UntypedFormControl {
    return this.signup.get('inviteCode') as UntypedFormControl;
  }

  get marketingConsent(): UntypedFormControl {
    return this.account.get('marketingConsent') as UntypedFormControl;
  }

  get aboutYourCompany(): UntypedFormGroup {
    return this.subscriptionData.get('yourBillingAddress') as UntypedFormGroup;
  }

  get paymentMethods(): UntypedFormGroup {
    return this.subscriptionData.get('paymentMethods') as UntypedFormGroup;
  }

  get cardType(): UntypedFormControl {
    return this.paymentMethods.get('cardType') as UntypedFormControl;
  }

  get agreeTermsOfUse(): UntypedFormControl {
    return this.subscriptionData.get('agreeTermsOfUse') as UntypedFormControl;
  }

  update = () => {
    this.updated1 = true;
    this.updated2 = true;
    this.signupV2();
  };

  toLogIn = () => {
    this.newAccount = false;
  };

  toSignUp = () => {
    this.newAccount = true;
  };

  authenticate = async () => {
    //this.submit.disabled = true;
    if (this.login.valid) {
      this.ngxService.start();
      try {
        const response: Response<LoginInterface> =
          await this.authenticationService.login(this.login.value);
        this.ngxService.stop();
        if (response?.success === true) {
          const cart = localStorage.getItem(StorageName.cart);
          const clientType = localStorage.getItem('clientType');
          const termly = localStorage.getItem('TERMLY_API_CACHE');
          localStorage.clear();
          localStorage.setItem('clientType', clientType);
          localStorage.setItem('TERMLY_API_CACHE', termly);
          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          localStorage.setItem(StorageName.username, response.data.firstname);
          const user = response.data;
          this.user = user;
          localStorage.setItem(StorageName.cart, cart);
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
  };

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
          region: localStorage.getItem('region') || 'all',
          currency: localStorage.getItem('currency') || 'eur',
          language: localStorage.getItem('lang') || 'en',
          marketingConsent: this.marketingConsent.value,
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

  subscribeUpdate = async (tags: string[]) => {
    const params: any = {
      email: this.user.email,
      tags: tags,
      firstName: this.user.firstname,
      lastName: this.user.lastname,
    };
    try {
      const response: Response<any> =
        await this.newsletterService.subscribeNewsletter(params);
      if (response?.success) {
        this.showSuccess(
          this.translate.instant('subscribeProject.description'),
          this.translate.instant('subscribeProject.title')
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  @HostListener('window:scroll', ['$event'])
  scrollSummary(event: any) {
    this.scrollLimit =
      this.donationForm?.nativeElement.offsetTop +
      this.donationForm?.nativeElement.offsetHeight;
    let position = window.pageYOffset;
    if (this.donationSummary) {
      position += this.donationSummary.nativeElement.offsetHeight + 150;
      if (position > this.scrollLimit) {
        this.donationSummary.nativeElement.classList.remove('fixed');
        this.donationSummary.nativeElement.classList.add('absolute');
      } else {
        this.donationSummary.nativeElement.classList.remove('absolute');
        this.donationSummary.nativeElement.classList.add('fixed');
      }
    }
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }

  displayPopup(): void {
    this.timeOutIds.push(
      setTimeout(
        () =>
          this.dialog.open(CalendlyPopupComponent, {
            data: {
              buttonUrl: 'https://page.greenfutureproject.com/meeting-checkout',
              type: 'checkout',
            },
            panelClass: 'noPadding',
          }),
        10000
      )
    );
  }
}
