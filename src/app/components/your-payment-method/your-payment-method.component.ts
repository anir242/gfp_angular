import { NewsletterService } from 'src/app/_services/public/newsletter.service';
import { TagTypes } from 'src/app/_models/components/tag-types';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../pages/_base/base/base.component';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import {
  PaymentRequestPaymentMethodEvent,
  PaymentRequestShippingAddressEvent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeAppService } from '../../_services/payments/stripe-app.service';
import { OrderSummaryService } from '../../_services/public/local/order-summary.service';
import {AuthService} from '../../_services/_base/auth.service';
import { Response } from '../../_models/api/response';
import { RoutingTypes } from '../../_models/components/routing-types';
import { CartTypes } from '../../_models/components/cart-types';
import { CartInterface } from '../../_models/cart-interface';
import { UsersInterface } from '../../_models/api/users/users-interface';
import { UsersService } from '../../_services/users/users.service';
import { StorageName } from '../../_models/components/storage-name';
import { UserTypes } from '../../_models/components/user-types';
import { environment } from '../../../environments/environment';
import { NativaApiService } from '../../_services/nativa.service';
import moment from 'moment';
import { TransactionsService } from 'src/app/_services/subscriptions/transactions.service';

@Component({
  selector: 'app-your-payment-method',
  templateUrl: './your-payment-method.component.html',
  styleUrls: ['./your-payment-method.component.scss']
})
export class YourPaymentMethodComponent extends BaseComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild('paymentRequestButton') paymentRequestButton: ElementRef;

  @Input() id: string;
  @Input() isPreviousPaymentMethod: boolean;
  @Input() paymentMethods: UntypedFormGroup;
  @Input() aboutYou: UntypedFormGroup;
  @Input() billingAddress: UntypedFormGroup;
  @Input() agreeTermsOfUse: UntypedFormControl;
  @Input() summaryTitle: string;
  @Input() summaryCostDescription: string;
  @Input() buttonText = this.translate.instant('singleDonations.confirm');
  @Input() summaryType: 'gift' | 'singleDonation' | 'subscriptions' =
    'singleDonation';
  @Input() savedPaymentMethodEnabled: boolean = true;
  @Input() marketingConsent: boolean = false;
  @Input() marketingConsentControl: UntypedFormControl;
  @Input() integrationType: string;
  @Input() customerData;
  @Input() isFreeAvailable: boolean = false;
  @Input() freeTransactionData: any;
  @Input() billingCountry: string;

  cartTypes = CartTypes;
  cartItems: CartInterface[];
  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontFamily: 'Chivo, sans-serif',
      },
      invalid: {
        color: '#df1b41'
      }
    }
  };

  selectedPaymentMethodId: string = null;
  allPaymentMethods = [];

  applePayEnable = false;
  googlePayEnable = false;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  appearance = {
    theme: 'flat'
  };

  paymentRequestOptions = {
    country: 'US',
    currency: 'eur',
    total: {
      label: 'Demo total',
      amount: 1099,
    },
    requestPayerName: true,
    requestPayerEmail: true,
  };

  public environment = environment;

  constructor(
    private cartService: OrderSummaryService,
    private stripeService: StripeService,
    private stripeAppService: StripeAppService,
    private userService: UsersService,
    private newsletterService: NewsletterService,
    private auth: AuthService,
    private nativaApiService: NativaApiService,
    private transactionService: TransactionsService,
  ) {
    super();
  }

  ngOnInit(): void {
    const total = this.cartService.getTotal(this.summaryType).totalCost;
    this.paymentRequestOptions.total.amount = Math.floor(total * 100);
    this.isPreviousPaymentMethod = false;
    if (this.auth.isAuthenticated()) {
      this.getPaymentMethods();
    }
  }

  onIsPreviousCardCheckboxChange(event: any): void {
    if (event.checked == true) {
      this.isPreviousPaymentMethod = true;
    } else {
      this.selectedPaymentMethodId = null;
      this.isPreviousPaymentMethod = false;
    }
  }

  async getPaymentMethods(): Promise<void> {
    try {
      const response: any = await this.stripeAppService.paymentMethods();
      if (response?.success) {
        this.allPaymentMethods = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  getCart(): void {
    this.cartService.dataUpdated.subscribe(() => {
      this.cartItems = this.cartService.getItemsByType(this.summaryType);
    });
    this.cartItems = this.cartService.getItemsByType(this.summaryType);
  }

  get cardType(): UntypedFormControl {
    return this.paymentMethods.get('cardType') as UntypedFormControl;
  }

  get cardName(): UntypedFormControl {
    return this.paymentMethods.get('cardName') as UntypedFormControl;
  }

  get cardNumber(): UntypedFormControl {
    return this.paymentMethods.get('cardNumber') as UntypedFormControl;
  }

  get cardCCV(): UntypedFormControl {
    return this.paymentMethods.get('cardCCV') as UntypedFormControl;
  }

  get cardExpireDate(): UntypedFormControl {
    return this.paymentMethods.get('cardExpireDate') as UntypedFormControl;
  }

  get code(): UntypedFormControl {
    return this.paymentMethods.get('code') as UntypedFormControl;
  }

  get canApplePay(): boolean {
    return this.applePayEnable; // window.ApplePaySession
  }

  get canGooglePay(): boolean {
    return this.googlePayEnable; // window.ApplePaySession
  }


  onPaymentMethod = async (ev: PaymentRequestPaymentMethodEvent): Promise<void> => {
    const total = this.cartService.getTotal(this.summaryType).totalCost;
    this.paymentRequestOptions.total.amount = Math.floor(total * 100);
    this.paymentRequestOptions.total.label = this.summaryTitle;

    const body: any = {
      cart: this.cartService.getItems()
    };
    if (this.code.value !== '') {
      body.promoCode = this.code.value;
    }
    try {
      this.createSubscriptionSession(this.cardType.value, ev.paymentMethod.id);
      /*} else {
        this.showErrorResponse(paymentIntent);

      }*/
    } catch (e) {
      this.showErrorResponse(e);
    }
  }


  onShippingAddressChange = (ev: PaymentRequestShippingAddressEvent) => {
    if (ev.shippingAddress.country !== 'US') {
      ev.updateWith({ status: 'invalid_shipping_address' });
    } else {
      // Replace this with your own custom implementation if needed
      /*fetch('/calculateShipping', {
        data: JSON.stringify({
          shippingAddress: ev.shippingAddress,
        }),
      } as any)
        .then((response) => response.json())
        .then((result) =>
          ev.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
          })
        );*/
    }
  }

  getProducts(): any[] {
    const items = this.cartService.getItems()
    const products: any[] = [];
    items.forEach((item) => {
      switch (item.internalType) {
        case CartTypes.SUBSCRIPTION:
          item.subscriptions.forEach((sub) => {
            products.push(this.asProduct(
              sub.id, 'Subscription', 'EUR', sub.costMonthly, sub.quantity, 'subscription',
              'subscriptions', '', 'subscriptions', 'Subscriptions'
            ));
          });
          break;
        case CartTypes.GIFT:
          if (item.gift) {
            products.push(this.asProduct(
              item.id, 'Gift', 'EUR', item.gift.giftCardPack?.giftCardValue, 1, item.id,
              'gifts', item.gift.giftCardPack?.giftCard?.title, 'gifts', 'gifts'
            ));
          }
          break;
        case CartTypes.SINGLE_DONATION:
          if (item.singleDonation) {
            products.push(this.asProduct(
              item.id, 'Donation', 'EUR', item.singleDonation.paymentPack?.price, item.singleDonation.paymentPack?.quantity, item.id,
              'donations', '', 'donations', 'Donations'
            ));
          }
          break;
      }
    });
    return products;
  }

  setupTags = () => {
    const tags = [];
    tags.push(TagTypes.CLIENT);
    if(localStorage.getItem(StorageName.clientType) === '2'){
      tags.push(TagTypes.BUSINESS);
    }else {
      tags.push(TagTypes.INDIVIDUAL);
    }
    if(this.cartService.getItems()[0]){
      if(this.cartService.getItems()[0].internalType === 'subscriptions') {
        tags.push(TagTypes.SUBSCRIPTION);
        tags.push(this.cartService.getItems()[0].name)
        this.cartService.getItems()[0].subscriptions.forEach((sub) => tags.push(sub.name))
      }else if(this.cartService.getItems()[0].internalType === 'singleDonation' && this.cartService.getItems()[0].name === 'CO2 Offset') {
        tags.push(TagTypes.DONATION);
        tags.push(TagTypes.OFFSET)
        tags.push(this.cartService.getItems()[0].singleDonation?.project?.name)
      }else if(this.cartService.getItems()[0].internalType === 'singleDonation' && this.cartService.getItems()[0].name === 'Donation') {
        tags.push(TagTypes.DONATION);
        tags.push(this.cartService.getItems()[0].singleDonation?.project?.name)
      }else if(this.cartService.getItems()[0].internalType === 'gift') {
        tags.push(TagTypes.GIFT);
        tags.push(TagTypes.SENDER);
        tags.push(this.cartService.getItems()[0].name)
      }
    }
    return tags;
  }

  subscribeToMailchimp = async () => {
    const tags = this.setupTags();
    const userData = JSON.parse(localStorage.getItem(StorageName.userData));
    const params: any = {
      email: userData.email,
      tags: tags,
      firstName: userData.firstName,
      lastName: userData.lastName,
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

  async sendData(): Promise<void> {
    this.getCart();
    this.id = null;
    const cartFiltered = this.cartService.getItems().filter((item) => {
      return item.internalType === CartTypes.SUBSCRIPTION;
    });
    if (cartFiltered?.length !== 0) {
      const subs = cartFiltered[0].subscriptions;
      let find = false;
      for (const item of subs) {
        if (item?.type) {
          find = true;
        }
      }
      if (find) {
        if (this.isPreviousPaymentMethod) {
          await this.createPaymentIntent(this.cardType.value, true, this.selectedPaymentMethodId);
        } else {
          await this.createPaymentIntent(this.cardType.value);
        }
      } else {
        if(this.isPreviousPaymentMethod === true){
          await this.createSubscriptionSession(this.cardType.value, this.selectedPaymentMethodId);
        }else{
          this.createSubscriptionSession(this.cardType.value)
        }
      }
    } else {
      if(this.isPreviousPaymentMethod){
        await this.createPaymentIntent('creditCard', true, this.selectedPaymentMethodId)
      }else{
        await this.createPaymentIntent(this.cardType.value);
      }
    }
  }

  createSubscriptionSession = async (cardType: string, methodId: string=null) => {
    try {
      if (this.aboutYou) {
        const updateUser: Response<UsersInterface> = await this.userService.updateUserById(
          localStorage.getItem(StorageName.id),
          {
            firstname: this.aboutYou.get('firstname')?.value,
            lastname: this.aboutYou.get('lastname')?.value
          }
        );
      }
      if (cardType === 'creditCard') {
        const customer: Response<UsersInterface> = await this.stripeAppService.getCustomer();
        if (customer?.success) {
          let billingDetails: any;
          if (this.billingAddress) {
            if (this.billingAddress.value?.sameAsCompany === false) {
              billingDetails = {
                address: {
                  city: this.billingAddress.value.city,
                  postal_code: this.billingAddress.value.zip,
                  line1: this.billingAddress.value.street,
                  line2: this.billingAddress.value.apartment,
                }
              };
            }
          }
          const cartFiltered = this.cartService.getItems().filter((item) => {
            return item.internalType !== CartTypes.GIFT;
          });
          const isPublic = !(cartFiltered?.length !== 0);

          let paymentMethodId;
          if(this.isPreviousPaymentMethod){
            paymentMethodId = this.selectedPaymentMethodId
          } else {
            const paymentMethod = await this.stripeService.createPaymentMethod({
              type: 'card',
              card: this.card.element,
              billing_details: billingDetails
            }).toPromise();
            
            paymentMethodId = paymentMethod.paymentMethod.id;

            const intent: Response<string> = await this.stripeAppService.setupIntent(isPublic, {
              cart: this.cartItems,
              paymentMethodId: paymentMethodId
            });

            const responseConfirm = await this.stripeService.confirmCardSetup(intent.data, {
              payment_method: paymentMethodId
            }).toPromise();
          }

        
          const response: Response<any> = await this.stripeAppService.createSubscription({
            payment_method: { id: paymentMethodId },
            customer: customer.data,
            cart: this.cartService.getItems(),
            billingAddress: this.billingAddress.value,
            clientTags: this.setupTags(),
          });

          if (response?.success) {
            this.pixelService.track('Purchase', {
              num_items: this.cartService.getItems().length,
              value: this.cartService.getTotal().totalCost,
              currency: 'EUR'
            });
            const products = this.getProducts();
            this.trackPurchase(response.data?.id, this.cartService.getTotal().totalCost, 0, 0, 'EUR', products);
            if(this.marketingConsent){
              this.subscribeToMailchimp();
            }
            await this.router.navigate([RoutingTypes.SUBSCRIPTIONS_WELCOME_ON_BOARD], {
              queryParams: {
                type: customer.data.type
              }
            });
          } else {
            this.showErrorResponse(response);
          }
        } else {
          this.showErrorResponse(customer);
        }
      }
    } catch (e) {
      console.error(e);
      this.showErrorResponse(e);
    }
  }

  createPaymentIntent = async (paymentType: string, usePreviousPaymentMethod?: boolean, paymentMethodId?: string ) => {
    try {
      this.ngxService.start('payment');
      const cartFiltered = this.cartService.getItems().filter((item) => {
        return item.internalType !== CartTypes.GIFT;
      });
      const isPublic = !(cartFiltered?.length !== 0);
      const body: any = {
        cart: this.cartService.getItems()
      };
      if (this.code.value !== '') {
        body.promoCode = this.code.value;
      }
      if (this.billingAddress) {
        body.billingAddress = this.billingAddress.value;
      }
      if(isPublic) { // if isPublic is true then send this data to be used for gift sender
        body.senderData = {
          type: localStorage.getItem(StorageName.clientType) === '1' ? 'individual' : 'business',
          region: localStorage.getItem('region') || 'all',
          currency: localStorage.getItem('currency') || 'eur',
          language: localStorage.getItem('lang') || 'en',
          marketingConsent: this.marketingConsent,
          privacyConsent: this.agreeTermsOfUse.value
        }
      }

      const userData = this.summaryType === 'gift' ? { email: body.cart[0].gift.sender.email, firstName: body.cart[0].gift.sender.name, lastName: body.cart[0].gift.sender.surname } : JSON.parse(localStorage.getItem(StorageName.userData));

      if (this.integrationType === 'nativa' && this.billingCountry === 'Italy'){
        body.taxPercent = 22;
      }

      const paymentIntent: Response<string> = await this.stripeAppService.paymentIntent(isPublic, body);
      if (paymentIntent?.success) {
        let response;
        switch (paymentType) {
          case 'creditCard':
            if(usePreviousPaymentMethod === true){
              response = await this.stripeService.confirmCardPayment(paymentIntent.data, {
                setup_future_usage: 'off_session',
                payment_method: paymentMethodId
              }).toPromise();
            }else{
              response = await this.stripeService.confirmCardPayment(paymentIntent.data, {
                setup_future_usage: 'off_session',
                payment_method: {
                  card: this.card.element
                }
              }).toPromise();
            }

            if (response?.paymentIntent?.id && response?.paymentIntent?.status === 'succeeded') {
              let transaction: Response<any>
              if(this.integrationType === 'nativa'){
                transaction = await this.stripeAppService.saveTransaction(isPublic, { ...response, clientTags: this.setupTags(), clientEmail: userData.email, consentData: {
                  marketingConsent: this.marketingConsentControl.value,
                  privacyConsent: this.agreeTermsOfUse.value
                }});
              }else{
                transaction = await this.stripeAppService.saveTransaction(
                  isPublic, 
                    { ...response, 
                      clientTags: this.setupTags(), 
                      clientEmail: userData.email, 
                      consentData: {
                        privacyConsent: this.agreeTermsOfUse.value
                      }
                    }
                  );
              }

              this.ngxService.stop('payment');
              if (transaction.success) {
                this.pixelService.track('Purchase', {
                  num_items: this.cartService.getItems().length,
                  value: this.cartService.getTotal().totalCost,
                  currency: 'EUR'
                });
                if(this.integrationType === 'nativa'){
                  await this.makeNativaTransaction(transaction.data)
                  if(this.marketingConsentControl.value){
                    this.subscribeToMailchimp();
                  }
                  await this.createTransactionForFreeCredits(transaction.data.transactionData);
                }else{
                  if(this.marketingConsent){
                    this.subscribeToMailchimp();
                  }
                }
                
                const totals = this.cartService.getTotal();
                const products = this.getProducts();
                this.trackPurchase(response.paymentIntent.id, totals.totalCost, 0, 0, 'EUR', products);
                switch (this.summaryType) {
                  case CartTypes.SINGLE_DONATION:
                    if(this.router.url.includes(RoutingTypes.NATIVA))
                    { 
                      await this.router.navigate([RoutingTypes.NATIVA_WELCOME]);
                      localStorage.setItem(StorageName.nativaTransactionData, JSON.stringify(
                        { 
                          isFreeAvailable: this.isFreeAvailable,
                          billingCountry: this.billingCountry
                        })
                      );
                      break;
                    }
                    await this.router.navigate([RoutingTypes.WELCOME_ON_BOARD], {
                      state: {
                        data: 'authorized',
                        value: transaction.data
                      }
                    });
                    break;
                  case CartTypes.GIFT:
                    await this.router.navigate([RoutingTypes.GIFT_WELCOME_ON_BOARD], {
                      state: {
                        data: 'authorized', value: transaction.data
                      }
                    });
                    break;

                  case CartTypes.SUBSCRIPTION:
                    await this.router.navigate([RoutingTypes.SUBSCRIPTIONS_WELCOME_ON_BOARD], {
                      queryParams: {
                        type: UserTypes.business
                      }
                    });
                    break;
                }
              } else {
                this.showErrorResponse(transaction);
              }
            } else {
              this.showError(
                response?.message,
                this.translate.instant('warning'),
              );
              this.ngxService.stop('payment');
              const transaction: Response<number> = await this.stripeAppService.saveTransaction(isPublic, response);

            }
            break;
        }
      } else {
        this.showErrorResponse(paymentIntent);
      }
    } catch (e) {
      this.ngxService.stop('payment');
      console.error(e);
      this.showErrorResponse(e);
    }
  }

  makeNativaTransaction = async (transaction) =>  {
    let transBody = {
      user_id: this.environment.nativaApiFeatureFlag ? this.customerData.sub : 'developer@greenfutureproject.com',
      drug_store_id: this.environment.nativaApiFeatureFlag ? this.customerData.drugstore_id : 'acme',
      transaction_id: transaction['transactionData'].id,
      co2_amount: this.cartService.getTotal(this.summaryType).totalCo2,
      project_name: "Riserva Rimba Raya",
      created_at: moment().format('DD-MM-YYYY'),
    }
    return await this.nativaApiService.createTransaction(transBody)
  }

  createTransactionForFreeCredits = async (transactionData) =>  {
    if(this.integrationType === 'nativa' && this.isFreeAvailable && this.freeTransactionData){
      this.freeTransactionData.addressId = transactionData.addressId;
      await this.transactionService.createTransaction(this.freeTransactionData).then();
    }
  }

  navigateToPrivacyPolicy = () => {
    this.openLinkInNewTab(RoutingTypes.PRIVACY_POLICY_PUBLIC);
  }

  openLinkInNewTab(path: string){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([path])
    )

    window.open(`${url}?utm_source=nativa_page`, '_blank');
  }
}
