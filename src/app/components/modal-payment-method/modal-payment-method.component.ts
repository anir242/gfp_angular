import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../pages/_base/base/base.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { PaymentMethodInterface } from 'src/app/_models/api/payments/payment-method-interface';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { StripeAppService } from 'src/app/_services/payments/stripe-app.service';
import { BillingDetailsInterface } from 'src/app/_models/api/payments/billing-details-interface';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-payment-method.component.html',
  styleUrls: ['./modal-payment-method.component.scss']
})
export class ModalPaymentMethodComponent extends BaseComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    hidePostalCode: true,
    style: {
      base: {
        backgroundColor: 'transparent',
        color: '#000',
        fontFamily: 'Chivo, sans-serif',
      },
      invalid: {
        color: '#df1b41'
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  disabled: false;
  paymentMethod: PaymentMethodInterface;
  billingDetails: BillingDetailsInterface;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private stripeService: StripeService,
    private stripeAppService: StripeAppService) {
    super();
    this.billingDetails = data;
  }

  async send() {
    try {
      const paymentMethod = await this.stripeService.createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: this.billingDetails
      }).toPromise();
      if (paymentMethod.error) return;

      const updatePaymentMethod = await this.stripeAppService.paymentMethod({
        paymentMethod: {
          id: paymentMethod.paymentMethod.id
        }
      })
      if (updatePaymentMethod.success == false) return;

      const responseConfirm = await this.stripeService.confirmCardSetup(updatePaymentMethod.data, {
        payment_method: {
          card: this.card.element,
          billing_details: this.billingDetails
        }
      }).toPromise();
    } catch (e) {
      this.dialog.closeAll()
    } 
    this.dialog.closeAll()
  }

}
