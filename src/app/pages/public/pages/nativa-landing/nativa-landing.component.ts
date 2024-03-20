import { BaseComponent } from 'src/app/pages/_base/base/base.component';
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
import { UsersService as UsersPublicService } from '../../../../_services/public/users/users.service';
import { UsersService } from 'src/app/_services/users/users.service';
import { ProjectsInterface } from '../../../../_models/api/projects/projects-interface';
import { AuthenticationService } from '../../../../_services/authentication/authentication.service';
import { LoginInterface } from '../../../../_models/api/login-interface';
import { AuthService } from '../../../../_services/_base/auth.service';
import { NativaService } from 'src/app/_services/public/nativa.service';
import { CountryPolicyService } from 'src/app/_services/country-policy/country-policy.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nativa-landing',
  templateUrl: './nativa-landing.component.html',
  styleUrls: ['./nativa-landing.component.scss']
})
export class NativaLandingComponent extends BaseComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('donationForm') donationForm: ElementRef;
  @ViewChild('donationSummary') donationSummary: ElementRef;
  @ViewChild('carousel') carousel: ElementRef;

  cartInterface: CartInterface;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  id: string;
  unit: string;

  initialOpen2 = false;
  updated1 = false;
  updated2 = false;

  projectSlug: string = 'kali';

  user: UsersInterface;
  summaryItem: SinglePaymentsInterface;

  cartTypes = CartTypes;

  buttonDisabled: boolean = true;

  singlePaymentPacksInterface: SinglePaymentPacksInterface;

  x = window.matchMedia('(max-width: 767px)');
  scrollLimit: number = 0;

  project: ProjectsInterface;
  projectId: string;

  newAccount = true;
  authenticated = false;
  tokenValidated = false;

  isFreeAvailable = false;
  freeQuantity = 3;

  creditsTotalAmount = 0;
  totalPayable = 0;

  co2TonnesFromActual = 0;
  co2FromFree = 0;
  buySummaryVisible = false;

  savedPaymentMethodEnabled = false;

  showAccountForm = true;

  billingAddress;
  billingCountry;
  countryPolicy;
  transactions;

  currentActiveSlide = 0;
  slideCount = 0;

  quantity = new UntypedFormControl(0, [Validators.min(1), Validators.max(10000)]);

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
    }),
  });
  subscriptionData = new UntypedFormGroup({
    yourBillingAddress: new UntypedFormGroup({
      companyName: new UntypedFormControl('', [Validators.required]),
      companyEmail: new UntypedFormControl('', [Validators.required]),
      country: new UntypedFormControl('Italy', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required]),
      street: new UntypedFormControl('', [Validators.required]),
      apartment: new UntypedFormControl('', [Validators.required]),
      vatNumber: new UntypedFormControl('', [Validators.required]),
      pec: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
      ]),
      zipCode: new UntypedFormControl(''),
      partnership: new UntypedFormControl('nativa'),
    }),
    paymentMethods: new UntypedFormGroup({
      code: new UntypedFormControl(''),
      cardType: new UntypedFormControl(''),
      cardName: new UntypedFormControl(''),
      cardNumber: new UntypedFormControl(''),
      cardCCV: new UntypedFormControl(''),
      cardExpireDate: new UntypedFormControl(''),
    }),
    agreeTermsOfUse: new UntypedFormControl(false, [Validators.requiredTrue]),
    marketingConsent: new UntypedFormControl(false),
  });

  projectDataLoaded = false;

  rimbaRayaImages = [{path: 'assets/images/rimba_raya_1.png'}, {path: 'assets/images/rimba_raya_2.png'},  {path: 'assets/images/rimba_raya_3.png'}]

  nativaToken: string;
  customerData: any;
  co2EmissionAmount: number;
  co2EmissionYear: number;
  freeTransactionData: any;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private authenticationService: AuthenticationService,
    private singlePaymentPacksService: SinglePaymentPacksService,
    private cartService: OrderSummaryService,
    private usersPublicService: UsersPublicService,
    private usersService: UsersService,
    private nativaService: NativaService,
    private policyChangeService: CountryPolicyService,
  ) {
    super();
  }

  // on the first load we check that the token in the url is valid or not
  // if it is valid we get the customer data
  // if it is not valid, user cannot do transaction, interactivity is limited to just see the project data


  // from the valid customer data, we get store id and sub
  // sub is customer foreign key between GFP and Nativa
  // drugstore id is the company email in GFP
  // we make an API call to check if a user exists with the same email as sub
  // if it exists, we get the data if they have done any transactions for this project before
  // if they have not done transactions, we have to give promotional free credits, visible in summary after they enter the quantity they want to buy
  // if they have done transactions, we just update the summary with the quantity they want to buy
  // if the session exists we donot show any sign up or login form, just the checkout form
  // if the session does not exist, we show the login form by default

  // after succesful transaction make api call to nativa backend
  // go to thanks page

  // if they do not exist, we make them enter the quantity and show the summary with free credits
  // we open the signup form by default and let them enter information. few details like email, company name is prefilled from the customer data

  // on entering quantity, we make a call to get the 


  ngOnInit(): void {
    this.setLangItalian().subscribe(
      {
        complete: () => {
            this.clearCart();
            this.getUrlParams()
            if(this.nativaToken){
              this.verifyNativaToken()
            }
            this.subscribeQuantityValueChange()
      }
    });
  }

  setLangItalian(){
    return this.translate.use('it');
  }


  calculateAmount(value){
    const price = value * this.singlePaymentPacksInterface.unit.costPerUnit;
    return price;
  }

  calculateCo2(value){
    const tons = value * this.singlePaymentPacksInterface.unit.co2KgPerUnit/1000
    return tons;
  }

  subscribeQuantityValueChange(){
    this.quantity.valueChanges.subscribe((value) => {
      if(value > 0){
        this.creditsTotalAmount = this.calculateAmount(value);
        this.co2TonnesFromActual =  this.calculateCo2(value);
        this.clearCart();
        this.setCart();
      }else{
        this.summaryItem = null;
      }
      if(this.quantity.value > 10000){
        this.quantity.setValue(10000);
      }
    })
  }

  clearCart(): void {
    this.cartService.clearCartByType(CartTypes.SINGLE_DONATION);
    this.cartService.clearCartByType(CartTypes.GIFT);
    this.cartService.clearCartByType(CartTypes.SUBSCRIPTION);
    this.summaryItem = null;
  }

  isLoggedIn = async () => {
    const isAuthenticated = await this.auth.isAuthenticatedSync().then();
      //this.stepper.selectedIndex = 1;
      const controls = ['email', 'password'];
      controls.forEach((value: string) => {
        this.account.get('login').get(value).clearValidators();
        this.account.get('login').get(value).updateValueAndValidity();
      });
    return isAuthenticated;
  };

  policyChange(value) {
    this.policyChangeService.updateCountryPolicy(value);
  }

  prefillForm = () => {
    if(this.customerData?.drugstore_name){
      this.aboutYourCompany.get('companyName').setValue(this.customerData?.drugstore_name);
      this.aboutYourCompany.get('companyName').disable();
    }

    if(this.customerData?.sub){
      this.email.setValue(this.customerData?.sub);
      this.email.disable();
    }

    this.aboutYourCompany.get('companyEmail').setValue(this.customerData?.drugstore_id);
  }

  getUserInfo = () => {
    const userEmail = this.customerData?.sub;
    try {
      this.usersPublicService.getUserByEmail(userEmail).subscribe(
        {
          // user with email exists
          next: async (response) => {
            if (response['success']) {
              this.user = response['data'];
              this.authenticated = await this.isLoggedIn().then();
              if(this.authenticated){
                this.showAccountForm = false;
                this.usersService.getTransactionsByPackId(this.singlePaymentPacksInterface.id).then(
                  (response) => {
                    const transactions = response['data'];
                    if(transactions.length > 0){
                      this.billingAddress = transactions[0]['address'];
                      this.countryPolicy = transactions[0]['address']['country_id'] === 'IT' ? 'italian' : 'other';
                        this.policyChange(this.countryPolicy);
                        this.billingCountry = 'Italy'
                      }
                    }
                  )
                // donot show the login/signup form
              }else{
                this.showAccountForm = true;
                this.toLogIn();
                // show the login/signup form
                // prefill email in login form
                // check the working of the about your account form functioning
              }
            } else {

            }},
          error: async(error) => {
            this.prefillForm();
            this.isFreeAvailable = true;
            this.freeTransactionData = await this.getFreeTransactionData().then();
            this.quantity.setValue(this.co2EmissionAmount - this.freeQuantity)
          },
          complete: () => {
          }
        }) 
      }
        catch (e) {
      // this.showErrorResponse(e?.error);
        }
  };

  ngAfterViewInit(): void {
    // this.scrollLimit =
    //   this.donationForm?.nativeElement.offsetTop +
    //   this.donationForm?.nativeElement.offsetHeight;
    // this.stepper._getIndicatorType = () => 'number';
    this.slideCount = this.carousel.nativeElement.children.length;
    this.makeActiveByIndex(this.currentActiveSlide)
  }

  makeActiveByIndex(index: number): void {
    for ( let element of this.carousel.nativeElement.children){
      const elementIndex = parseInt(element.dataset.index);
      if (elementIndex === index) {
        element.classList.add('active');
      }else{
        element.classList.remove('active');
      }
    }
  }

  getUrlParams = async () => {
    this.route.queryParams.subscribe((params) => {
      if(params.co2){
        this.co2EmissionAmount = params.co2;
      }
      if(params.co2_year){
        this.co2EmissionYear = params.co2_year;
      }
      if(params.token){
        this.nativaToken = params.token;
      }else{
        const errorType = this.translate.instant("nativa.errorCodes.linkNotValid")
        const errorMessage = this.translate.instant("nativa.errorCodes.tokenNotPresent")
        this.showError(errorMessage, errorType);
      }
    });

  }

  verifyNativaToken() {
    this.nativaService.verifyToken({ token: this.nativaToken }).subscribe(
      {
        next: (response) => {
          this.customerData = response['data'];
          this.tokenValidated = true;
        },
        error: (error) => {
          this.showError(this.translate.instant(`nativa.errorCodes.${error.error.code}`), this.translate.instant('nativa.errorCodes.linkNotValid'));
        },
        complete: async() => {
          await this.getPayments().then(
            () => (this.projectDataLoaded = true)
          );
          this.getUserInfo();
        }
    });
  }

  setProject = async () => {
    if (this.singlePaymentPacksInterface) {
      this.project = this.singlePaymentPacksInterface.project;
    }
  }

  setCart = async () => {
    const value = parseInt(this.quantity.value);
    let summaryItem =
      this.singlePaymentPacksInterface.singlePayments.filter(
        (x) => x.quantity === value
      )[0]
    if (!summaryItem) {
      const price = this.calculateAmount(value);
      this.summaryItem = {
        id: '',
        packId: this.singlePaymentPacksInterface.id,
        quantity: value,
        price: price,
      }
    }else{
      this.summaryItem = summaryItem;
    }
    this.cartInterface = {
      id: this.singlePaymentPacksInterface.id,
      internalType: CartTypes.SINGLE_DONATION,
      name: "Donation",
      singleDonation: {
        unit: this.singlePaymentPacksInterface.unit,
        project: this.singlePaymentPacksInterface.project,
        paymentPack: this.summaryItem,
      },
    };
    this.cartService.addToCart(this.cartInterface);
  };

  setDisabled(event): void {
    this.buttonDisabled = !(this.id || event.index == 1);
  }

  getPayments = async () => {
    this.ngxService.start();
    try {
      const response: Response<SinglePaymentPacksInterface> =
        await this.singlePaymentPacksService.getPackBySlug(this.projectSlug, 'all');
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e?.error);
    }
    this.ngxService.stop();
  };

  // tracking information
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

  // tracking information
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

  async registerUser(): Promise<void> {
    await this.signupV2().then(async() => {
      await this.createSinglePayment().then();
      this.update2();
      this.stepper.next();
    })
  }

  async createSinglePayment(): Promise<void> {
    if (this.summaryItem && this.summaryItem.id != '') {
      this.selectProduct(this.summaryItem?.id, this.summaryItem?.price);
    }
    if (this.summaryItem?.id == '') {
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

  update2(): void {
    this.cartService.addBillingData(
      true
    );
    this.updated2 = true;
  }

  updateStatus(event): void {
    // if (!this.offset) {
    //   if (event.selectedIndex === 0) {
    //     this.updated1 = false;
    //   } else {
    //     this.updated1 = true;
    //   }

    //   if (event.selectedIndex === 1) {
    //     this.initialOpen2 = true;
    //     this.updated2 = false;
    //   } else {
    //     this.updated2 = true;
    //   }
    // }
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

  get marketingConsent(): UntypedFormControl {
    return this.subscriptionData.get('marketingConsent') as UntypedFormControl;
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
          const clientType = localStorage.getItem('clientType') || (response.data.type === 'individual' ? '1' : '2');
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
        this.showErrorResponse(e?.error);
        this.stepper.selectedIndex = 0;
      }
    }
    //this.submit.disabled = false;
  };

  async signupV2(): Promise<void> {
    if (this.signup.valid && !(await this.auth.isAuthenticatedSync())) {
      this.ngxService.start();
      let response: Response<LoginInterface>;
      try {
        response = await this.authenticationService.signupV2({
          email: this.email.value,
          password: this.password.value,
          type: 'business',
          firstname: this.firstname?.value,
          lastname: this.lastname?.value,
          region: localStorage.getItem('region') || 'all',
          currency: localStorage.getItem('currency') || 'eur',
          language: localStorage.getItem('lang') || 'en',
          marketingConsent: this.marketingConsent.value,
          privacyConsent: this.agreeTermsOfUse.value,
          companyName: this.aboutYourCompany.get('companyName').value,
          apartment: this.aboutYourCompany.get('apartment').value,
          street: this.aboutYourCompany.get('street').value,
          city: this.aboutYourCompany.get('city').value,
          zipCode: this.aboutYourCompany.get('zipCode').value,
          country: this.aboutYourCompany.get('country').value,
          vatNumber: this.aboutYourCompany.get('vatNumber').value,
          pec: this.aboutYourCompany.get('pec').value,
          companyEmail: this.aboutYourCompany.get('companyEmail').value,
          partnership: this.aboutYourCompany.get('partnership').value,
        });
        this.ngxService.stop();
        if (response?.success === true) {
          this.user = response.data;
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.username, response.data.firstname);
          localStorage.setItem(StorageName.clientType, '2');
          this.identify('sign_up', 'GFP');
        } else {
          this.showErrorResponse(response);
          this.stepper.selectedIndex = 0;
        }
      } catch (e) {
        this.ngxService.stop();
        this.logError(e);
        this.showErrorResponse(e.error);
        // this.stepper.selectedIndex = 0;
      }
    } else {
      // this.signup.markAllAsTouched();
      // if (!this.auth.isAuthenticated) {
      //   this.stepper.selectedIndex = 0;
      // }
    }
  }

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

  checkFreeQuantityPayment = async () => {
    const singlePayment = this.singlePaymentPacksInterface.singlePayments.filter((x) => ( x.quantity === this.freeQuantity )) 

    if(!(singlePayment.length > 0)) {
      let res: SinglePaymentsInterface = (
        await this.singlePaymentPacksService.createSinglePaymentObject({
          packId: this.singlePaymentPacksInterface.id,
          price: this.calculateAmount(this.freeQuantity),
          status: 'inactive',
          quantity: this.freeQuantity,
        })
      ).data;
      singlePayment.push(res);
    }
    return singlePayment[0];
  }

  getFreeTransactionData = async () => {
    const singlePayment = await this.checkFreeQuantityPayment();

    const description = `nativa bonus,  ${this.co2EmissionYear}, ${this.co2EmissionAmount}`
    
    return {
      type: 'singleDonation',
      internalId: singlePayment.id,
      amount: this.calculateAmount(this.freeQuantity)*100,
      currency: 'eur',
      visibleFromDate: new Date().toString(),
      description: description,
      status: 'succeeded',
      singlePaymentId: singlePayment.id,
    }
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }

  carouselLeft() {
    if(this.currentActiveSlide - 1 >= 0) {
      this.currentActiveSlide = this.currentActiveSlide - 1;
    } else {
      this.currentActiveSlide = this.slideCount - 1;
    }
    this.makeActiveByIndex(this.currentActiveSlide);
  };

  carouselRight() {
    if(this.currentActiveSlide + 1 < this.slideCount) {
      this.currentActiveSlide++;
    } else {
      this.currentActiveSlide = 0;
    } 
    this.makeActiveByIndex(this.currentActiveSlide);
  };

  openLinkInNewTab(path: string, queryParams?: any){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([path])
    )

    window.open(`${url}?${queryParams}`, '_blank');
  }

  navigateToProjectPage(){
    this.openLinkInNewTab(`${RoutingTypes.PROJECTS_PUBLIC}/${this.projectSlug}`, "utm_source=nativa_page");
  }
}
