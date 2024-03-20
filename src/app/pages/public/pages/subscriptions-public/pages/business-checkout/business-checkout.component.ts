import { CalendlyPopupComponent } from 'src/app/pages/public/components/calendly-popup/calendly-popup.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainSubscriptionsService } from '../../../../../../_services/subscriptions/main-subscriptions.service';
import { Response } from '../../../../../../_models/api/response';
import { SubscriptionTypeGroupsInterface } from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { LoginInterface } from '../../../../../../_models/api/login-interface';
import { StorageName } from '../../../../../../_models/components/storage-name';
import { OrderSummaryService } from '../../../../../../_services/public/local/order-summary.service';
import { CartTypes } from '../../../../../../_models/components/cart-types';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionTypes } from '../../../../../../_models/components/subscription-types';
import {
  ClimatePioneerTypes,
  ClimatePioneerModels,
} from '../../../../../../_models/components/climate-pioneer-types';
import { EcommerceTypesService } from '../../../../../../_services/companies/ecommerce-types.service';
import { EcommerceTypeInterface } from '../../../../../../_models/api/companies/ecommerce-type-interface';
import { SubscriptionTypeValuesInterface } from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';
import { UnitTypes } from '../../../../../../_models/components/unit-types';
import { BaseComponent } from '../../../../../_base/base/base.component';
import { AuthenticationService } from '../../../../../../_services/authentication/authentication.service';
import { AuthService } from '../../../../../../_services/_base/auth.service';
import { CountryPolicyService } from 'src/app/_services/country-policy/country-policy.service';
import { NewsletterService } from 'src/app/_services/public/newsletter.service';

@Component({
  selector: 'app-business-checkout',
  templateUrl: './business-checkout.component.html',
  styleUrls: ['./business-checkout.component.scss'],
})
export class BusinessCheckoutComponent extends BaseComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  subscriptionGroup: SubscriptionTypeGroupsInterface;
  employees: string[];
  cartTypes = CartTypes;
  subscriptionTypes = SubscriptionTypes;
  climatePioneerTypes = ClimatePioneerTypes;
  climatePioneerModels = ClimatePioneerModels;
  itemsOrRevenues = 'itemsOrRevenues';
  percentageOrItemToPlant = 'percentageOrItemToPlant';
  pioneerType = 'pioneerType';
  pioneerModelType = 'pioneerModelType';
  ecommerceTypes: EcommerceTypeInterface[];
  selectedAShop = false;
  selectedShop: string;
  newAccount = true;
  authenticated = false;
  countryPolicy: string;
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
    }),
    marketingConsent: new UntypedFormControl(false),
  });
  businessCheckOut = new UntypedFormGroup({
    about: new UntypedFormGroup({
      firstname: new UntypedFormControl('', [Validators.required]),
      lastname: new UntypedFormControl('', [Validators.required]),
    }),
    aboutYourCompany: new UntypedFormGroup({
      companyName: new UntypedFormControl('', [Validators.required]),
      vatNumber: new UntypedFormControl(''),
      country: new UntypedFormControl('', [Validators.required]),
      sdi: new UntypedFormControl(''),
      city: new UntypedFormControl('', [Validators.required]),
      streetHouse: new UntypedFormControl('', [Validators.required]),
      apartment: new UntypedFormControl('', [Validators.required]),
      zip: new UntypedFormControl(''),
      pec: new UntypedFormControl('', [
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
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
  });

  showSdi = true;
  employeesArray = new UntypedFormArray([]);
  recap = false;
  initialOpen2 = false;
  billingAddress = false;
  disableEmployeesNextStep = true;

  co2Values: SubscriptionTypeValuesInterface[];
  costPerMonth = 0;
  timeOutIds = [];

  constructor(
    private mainSubscriptionsService: MainSubscriptionsService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private cartService: OrderSummaryService,
    private ecommerceTypesService: EcommerceTypesService,
    private policyChangeService: CountryPolicyService,
    private authenticationService: AuthenticationService,
    private newsletterService: NewsletterService,
    public translate: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.cartService.removeItem();
    this.getParams();
    window.onfocus = () => {
      if (this.selectedAShop) {
        this.disableEmployeesNextStep = false;
        this.selectedAShop = false;
      }
    };
  }

  ngAfterContentInit(): void {
    this.isLoggedIn();
  }

  ngOnDestroy() {
    this.timeOutIds.forEach((id) => clearTimeout(id));
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  isLoggedIn = () => {
    setTimeout(() => {
      if (this.auth.isAuthenticated() && this.stepper) {
        this.authenticated = true;
        const loginControls = ['email', 'password'];
        loginControls.forEach((value: string) => {
          this.login.controls[value].clearValidators();
          this.login.controls[value].updateValueAndValidity();
        });
        const controls = ['email', 'password', 'cPassword'];
        controls.forEach((value: string) => {
          this.signup.controls[value].clearValidators();
          this.signup.controls[value].updateValueAndValidity();
        });
        const aboutControls = ['firstname', 'lastname'];
        aboutControls.forEach((value: string) => {
          this.about.controls[value].clearValidators();
          this.about.controls[value].updateValueAndValidity();
        });
        //const companyControls = ["companyName", "vatNumber", "apartment", "street", "zip", "country", "city"];
        //companyControls.forEach((value: string) => {
        //  this.yourCompany.controls[value].clearValidators();
        //  this.yourCompany.controls[value].updateValueAndValidity();
        //});
      }
    }, 2000);
  };

  policyChange(value) {
    this.policyChangeService.updateCountryPolicy(value);
    this.countryPolicy = value;
  }

setValues(addToCart: boolean): void {
    const subs = [];
    this.subscriptionGroup.subscriptionsTypes.forEach((value1, index) => {
      if (
        this.subscriptionGroup.slug === this.subscriptionTypes.climateLeader
      ) {
        subs.push({
          id: value1.id,
          quantity: this.employeesArray.at(index).value,
          projects: value1.subscriptionTypeValues,
          costMonthly: value1.costMonthly,
          cost: value1.costMonthly,
          name: value1.name,
        });
      } else {
        if (value1.slug === this.pioneerSelected.value) {
          value1.subscriptionTypeValues?.forEach((project) => {
            const quantity =
              this.pioneerModel.value ===
              this.climatePioneerModels.revenuePercentage
                ? (this.itemsOrRevenuesValue.value *
                    this.percentageOrItemToPlantValue.value) /
                  100
                : this.itemsOrRevenuesValue.value *
                  this.percentageOrItemToPlantValue.value;
            let costPerMonth = 0;
            project.initialQuantity = project.quantity;
            if (project.unit.slug === UnitTypes.TREE) {
              project.quantity = Number(quantity);
              costPerMonth = project.quantity;
            } else {
              project.quantity = quantity * project.allocation;
            }
            subs.push({
              id: value1.id,
              name: value1.name,
              quantity: project.quantity,
              projects: [project],
              costMonthly: costPerMonth,
              cost: costPerMonth,
              type: this.pioneerSelected.value,
              itemsOrRevenues: this.itemsOrRevenuesValue.value,
              percentageOrItemToPlant: this.percentageOrItemToPlantValue.value,
              pioneerType: this.pioneerModel.value,
            });
          });
        }
      }
    });
    if (addToCart === true) {
      this.cartService.removeItem();
      this.cartService.addToCart({
        id: '',
        name: this.subscriptionGroup.name,
        internalType: CartTypes.SUBSCRIPTION,
        subscriptions: subs,
      });
    }
  }

  getParams = () => {
    this.route.params.subscribe((params) => {
      if (params?.slug) {
        this.getSubscriptionTypes(params.slug).then();
      }
    });
  };

  getSubscriptionTypes = async (slug: string) => {
    try {
      const response: Response<SubscriptionTypeGroupsInterface> =
        await this.mainSubscriptionsService.getMainSubscriptionBySlug(slug);
      if (response?.success) {
        this.subscriptionGroup = response.data;
        if (this.subscriptionGroup.slug === SubscriptionTypes.climateLeader) {
          let employees = localStorage.getItem(StorageName.businessEmployees);
          if (!employees) {
            employees = '0,0,0';
          }
          this.employees = employees.split(',');
          if (this.employees) {
            if (this.employees.length > 3) {
              this.employees = this.employees.splice(0, 3);
            }
            this.employees?.forEach((item) => {
              this.employeesArray.push(new UntypedFormControl(Number(item)));
            });
          } else {
            for (const subType of this.subscriptionGroup?.subscriptionsTypes) {
              this.employeesArray.push(new UntypedFormControl(0));
            }
          }
          this.disableEmployeesNextStep = this.employeesArray.value.filter((item) => item !== 0).length === 0;
          this.setEmployeesListener();
          this.setCart();
        } else {
          //localStorage.removeItem(StorageName.businessPioneer);
          let pioneerType = 'manual';
          let pioneerModel = 'treePerItem';
          let itemsOrRevenue = 20
          let treesOrPercentage = 1;
          const infoPioneerString = localStorage.getItem(
            StorageName.businessPioneer
          );
          if (infoPioneerString) {
            const infoPioneer = infoPioneerString.split(';');
            pioneerType = infoPioneer[0];
            pioneerModel = infoPioneer[3];
            itemsOrRevenue = Number(infoPioneer[1]);
            treesOrPercentage = Number(infoPioneer[2]);
          } else {
            localStorage.setItem(StorageName.businessPioneer,
              pioneerType + ';20;1;' + pioneerModel
            );
          }
          this.businessCheckOut.addControl(
            this.percentageOrItemToPlant,
            new UntypedFormControl(treesOrPercentage, [Validators.min(1)])
          );
          this.businessCheckOut.addControl(
            this.itemsOrRevenues,
            new UntypedFormControl(itemsOrRevenue, Validators.min(1))
          );
          this.businessCheckOut.addControl(
            this.pioneerType,
            new UntypedFormControl(pioneerType)
          );
          this.businessCheckOut.addControl(
            this.pioneerModelType,
            new UntypedFormControl(pioneerModel)
          );
          await this.loadAvailableEcommerce();
          if (pioneerType === 'manual') {
            this.disableEmployeesNextStep = false;
          }
          this.itemsOrRevenuesValue.valueChanges.subscribe((val) => {
            this.setValues(true);
          });
          this.percentageOrItemToPlantValue.valueChanges.subscribe((val) => {
            this.setValues(true);
          });
          this.pioneerModel.valueChanges.subscribe((val) => {
            this.setFieldValidation(val);
            this.setValues(true);
          });
          this.setCart();
        }
        this.startCheckout();
      }
    } catch (e) {}
  };

  setFieldValidation(pioneerModel): void {
    this.percentageOrItemToPlantValue.clearValidators();
    if (pioneerModel == 'treePerItem') {
      this.percentageOrItemToPlantValue.addValidators([Validators.min(1)]);
      this.percentageOrItemToPlantValue.patchValue(1);
      this.itemsOrRevenuesValue.patchValue(20);
    } else {
      this.percentageOrItemToPlantValue.addValidators([Validators.min(0.5), Validators.max(100)]);
      this.percentageOrItemToPlantValue.patchValue(1);
      this.itemsOrRevenuesValue.patchValue(2000);
    }
  }

  setEmployeesListener = () => {
    this.employeesArray.valueChanges.subscribe((items: any[]) => {
      localStorage.setItem(StorageName.businessEmployees, items.join(','));
      this.setValues(true);
      this.disableEmployeesNextStep =
        items.filter((item) => item !== 0).length === 0;
      this.setCart();
    });
  };

  loadAvailableEcommerce = async () => {
    try {
      const response: Response<EcommerceTypeInterface[]> =
        await this.ecommerceTypesService.getEcommerceTypes();
      if (response?.success) {
        this.ecommerceTypes = response.data;
      } else {
      }
    } catch (e) {}
  };

  setCart(): void {
    this.cartService.removeItem();
    this.setValues(true);
  }

  startCheckout(): void {
    const totals: any = this.cartService.getTotal();
    this.track('begin_checkout', [
      this.asProduct(
        this.subscriptionGroup.id,
        this.subscriptionGroup.name,
        'EUR',
        totals.totalCost,
        this.cartService.cartItems.length,
        this.subscriptionGroup.slug,
        'subscriptions',
        'business',
        'subscriptions',
        'Subscriptions'
      ),
    ]);
  }

  updateStatus = ($event: StepperSelectionEvent) => {
    this.recap = $event.selectedIndex !== 0;
    //this.billingAddress = $event.selectedIndex !== 1;
  };

  updateRecap(): void {
    if (this.selectedShop && this.aboutYourCompany.valid) {
      this.setCart();
    }
    this.recap = true;
    this.initialOpen2 = true;
  }

  quantity = (i: number): UntypedFormControl => {
    return this.employeesArray.at(i) as UntypedFormControl;
  };

  get email(): UntypedFormControl {
    return this.signup?.get('email') as UntypedFormControl;
  }

  get password(): any {
    return this.signup?.get('password');
  }

  get cPassword(): any {
    return this.signup?.get('cPassword');
  }

  get login(): UntypedFormGroup {
    return this.account.get('login') as UntypedFormGroup;
  }

  get signup(): UntypedFormGroup {
    return this.account.get('signup') as UntypedFormGroup;
  }

  get yourCompany(): UntypedFormGroup {
    return this.account.get('yourCompany') as UntypedFormGroup;
  }

  get about(): UntypedFormGroup {
    return this.businessCheckOut.get('about') as UntypedFormGroup;
  }

  get aboutYourCompany(): UntypedFormGroup {
    return this.businessCheckOut.get('aboutYourCompany') as UntypedFormGroup;
  }

  get paymentMethods(): UntypedFormGroup {
    return this.businessCheckOut.get('paymentMethods') as UntypedFormGroup;
  }

  get agreeTermsOfUse(): UntypedFormControl {
    return this.businessCheckOut.get('agreeTermsOfUse') as UntypedFormControl;
  }

  get marketingConsent(): UntypedFormControl {
    return this.account.get('marketingConsent') as UntypedFormControl;
  }

  get firstname(): UntypedFormControl {
    return this.about.get('firstname') as UntypedFormControl;
  }
  get lastname(): UntypedFormControl {
    return this.about.get('lastname') as UntypedFormControl;
  }

  get companyName(): any {
    return this.aboutYourCompany.get('companyName');
  }

  get vatNumber(): any {
    return this.aboutYourCompany.get('vatNumber');
  }

  get country(): UntypedFormControl {
    return this.aboutYourCompany.get('country') as UntypedFormControl;
  }

  get sdi(): UntypedFormControl {
    return this.aboutYourCompany.get('sdi') as UntypedFormControl;
  }

  get pec(): UntypedFormControl {
    return this.aboutYourCompany.get('pec') as UntypedFormControl;
  }

  get city(): UntypedFormControl {
    return this.aboutYourCompany.get('city') as UntypedFormControl;
  }

  get streetHouse(): UntypedFormControl {
    return this.aboutYourCompany.get('streetHouse') as UntypedFormControl;
  }

  get apartment(): UntypedFormControl {
    return this.aboutYourCompany.get('apartment') as UntypedFormControl;
  }

  get zip(): UntypedFormControl {
    return this.aboutYourCompany.get('zip') as UntypedFormControl;
  }

  get pioneerSelected(): UntypedFormControl {
    return this.businessCheckOut?.get(this.pioneerType) as UntypedFormControl;
  }

  get pioneerModel(): UntypedFormControl {
    return this.businessCheckOut?.get(
      this.pioneerModelType
    ) as UntypedFormControl;
  }

  get itemsOrRevenuesValue(): UntypedFormControl {
    return this.businessCheckOut?.get(
      this.itemsOrRevenues
    ) as UntypedFormControl;
  }

  get percentageOrItemToPlantValue(): UntypedFormControl {
    return this.businessCheckOut?.get(
      this.percentageOrItemToPlant
    ) as UntypedFormControl;
  }

  getInTouch = () => {
    window.open('https://calendly.com/green-future-project');
  };

  changePioneerSelection = (pioneerType: string) => {
    this.pioneerSelected.patchValue(pioneerType);
    this.setValues(true);
    switch (pioneerType) {
      case ClimatePioneerTypes.manual:
        this.disableEmployeesNextStep = false;
        break;
      case ClimatePioneerTypes.automatic:
        this.disableEmployeesNextStep = true;
        break;
    }
  };

  shopSelected(slug: string): void {
    this.selectedAShop = true;
    this.selectedShop = slug;
  }

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
          const subs = localStorage.getItem(StorageName.businessEmployees);
          const subsPioneer = localStorage.getItem(StorageName.businessPioneer);
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
          localStorage.setItem(StorageName.businessEmployees, subs);
          localStorage.setItem(StorageName.businessPioneer, subsPioneer);
          this.loggedUserService.logged.emit();
          this.authenticated = true;
          this.identify('login', 'GFP');
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

  subscribeUpdate = async (tags: string[]) => {
    const params: any = {
      email: this.email.value,
      tags: tags,
      firstName: this.firstname?.value,
      lastName: this.lastname?.value,
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

  async signupV2(): Promise<void> {
    if (this.signup.valid && !this.auth.isAuthenticated()) {
      this.ngxService.start();
      let response: Response<LoginInterface>;
      try {
        response = await this.authenticationService.signupV2({
          email: this.email.value,
          password: this.password.value,
          type: 'business',
          firstname: this.firstname?.value,
          lastname: this.lastname?.value,
          companyName: this.companyName?.value,
          vatNumber: this.vatNumber?.value,
          country: this.country?.value,
          city: this.city?.value,
          apartment: this.apartment?.value,
          street: this.streetHouse?.value,
          zipCode: this.zip?.value,
          sdi: this.sdi?.value ?? null,
          pec: this.pec?.value ?? null,
          region: localStorage.getItem('region') || 'all',
          currency: localStorage.getItem('currency') || 'eur',
          language: localStorage.getItem('lang') || 'en',
          marketingConsent: this.marketingConsent.value,
          privacyConsent: true //true because without this consent the user cannot do the checkout
        });
        this.ngxService.stop();
        if (response?.success === true) {
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
