import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {StripeCardComponent, StripeService} from 'ngx-stripe';
import {
  PaymentRequestPaymentMethodEvent,
  PaymentRequestShippingAddressEvent,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {StripeAppService} from '../../../../../../_services/payments/stripe-app.service';
import {Response} from '../../../../../../_models/api/response';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-payment-method',
  templateUrl: './gift-payment-method.component.html',
  styleUrls: ['./gift-payment-method.component.scss']
})
export class GiftPaymentMethodComponent extends BaseComponent implements OnInit {
  @Output() dataSent = new EventEmitter<void>();
  @Input() id: string;
  @Input() paymentMethods: UntypedFormGroup;
  @Input() sender: any;
  @Input() showPromo = true;
  @Input() agreeTermsOfUse: UntypedFormControl;
  @Input() buttonText = this.translate.instant('singleDonations.confirm');
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild('paymentRequestButton') paymentRequestButton: ElementRef;
  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        backgroundColor: '#ffffff',
        color: '#30313d',
        fontFamily: 'Chivo, sans-serif',
      },
      invalid: {
        color: '#df1b41'
      }
    }
  };

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
  private paymentRequest: PaymentRequest;


  constructor(
    private cartService: OrderSummaryService,
    private orderSummaryService: OrderSummaryService,
    private stripeService: StripeService,
    private stripeAppService: StripeAppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadStripe().then();
    let total = 0;
    for (const item of this.orderSummaryService.getItems()) {
      total += item.price * 100;
    }
    this.paymentRequestOptions.total.amount = total;
  }

  private async loadStripe(): Promise<void> {
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

    try {
      const paymentIntent: Response<string> = await this.stripeAppService.giftCardPaymentIntent(this.cartService.getItems());
      if (paymentIntent?.success) {
        const paymentResult = await this.stripeService.confirmCardPayment(paymentIntent.data, {
          payment_method: ev.paymentMethod.id
        }, {
          handleActions: false
        }).toPromise();
      } else {
        this.showErrorResponse(paymentIntent);

      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }


  onShippingAddressChange = (ev: PaymentRequestShippingAddressEvent) => {
    if (ev.shippingAddress.country !== 'US') {
      ev.updateWith({status: 'invalid_shipping_address'});
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

  onNotAvailable = () => {
    // Subscribe to this event in case you want to act
    // base on availability
    console.log('Payment Request is not Available');
  }


  async sendData(): Promise<void> {
    this.id = null;
    if (this.cardType.value === 'creditCard') {
      await this.createPaymentIntent(this.cardType.value);
    }
  }

  createPaymentIntent = async (paymentType: string) => {
    try {
      const paymentIntent: Response<string> = await this.stripeAppService.giftCardPaymentIntent({
        promoCode: this.code.value,
        cart: this.cartService.getItems(),
        sender: this.sender
      });
      if (paymentIntent?.success) {
        switch (paymentType) {
          case 'creditCard':
            const response = await this.stripeService.confirmCardPayment(paymentIntent.data, {
              payment_method: {
                card: this.card.element
              }
            }).toPromise();

            break;
        }
      } else {
        this.showErrorResponse(paymentIntent);
      }
    } catch (e) {
      console.error(e);
      this.showErrorResponse(e);
    }
  }
}
