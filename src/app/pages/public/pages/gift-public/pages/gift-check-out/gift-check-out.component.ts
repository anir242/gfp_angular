import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../../../components/validator/input-equals';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {MatStepper} from '@angular/material/stepper';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {CartTypes} from '../../../../../../_models/components/cart-types';

@Component({
  selector: 'app-gift-check-out',
  templateUrl: './gift-check-out.component.html',
  styleUrls: ['./gift-check-out.component.scss']
})
export class GiftCheckOutComponent extends BaseComponent implements OnInit, AfterViewInit {
  updated = false;
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private cartService: OrderSummaryService,
  ) {
    super();
  }

  checkOut = new UntypedFormGroup({
    aboutYou: new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      surname: new UntypedFormControl('', [Validators.required]),
    }),
    contactInfo: new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      cEmail: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
    }, {validators: ConfirmedValidator('email', 'cEmail')}),
/*    contactInfo: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      cEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required]),
    }),*/
    paymentMethods: new UntypedFormGroup({
      code: new UntypedFormControl(''),
      cardType: new UntypedFormControl(''),
      cardName: new UntypedFormControl(''),
      cardNumber: new UntypedFormControl(''),
      cardCCV: new UntypedFormControl(''),
      cardExpireDate: new UntypedFormControl(''),
    }),
    agreeTermsOfUse: new UntypedFormControl('', [Validators.requiredTrue]),
    marketingConsent: new UntypedFormControl(false),
  });

  ngOnInit(): void {
    this.isCartEmpty();
    this.pixelService.track('InitiateCheckout', {
      num_items: this.cartService.getItems().length,
      currency: 'EUR'
    });
    this.startCheckout();
  }
  isCartEmpty(): void {
    if (this.cartService.isCartEmptyByType(CartTypes.GIFT)) {
      this.router.navigate([RoutingTypes.GIFT]);
    }
  }

  get about(): UntypedFormGroup {
    return this.checkOut.get('aboutYou') as UntypedFormGroup;
  }

  get contact(): UntypedFormGroup {
    return this.checkOut.get('contactInfo') as UntypedFormGroup;
  }

  get paymentMethods(): UntypedFormGroup {
    return this.checkOut.get('paymentMethods') as UntypedFormGroup;
  }

  get agree(): UntypedFormControl {
    return this.checkOut.get('agreeTermsOfUse') as UntypedFormControl;
  }

  get marketingConsent(): UntypedFormControl {
    return this.checkOut.get('marketingConsent') as UntypedFormControl;
  }

  get email(): UntypedFormControl {
    return this.contact?.get('email') as UntypedFormControl;
  }

  get cEmail(): UntypedFormControl {
    return this.contact?.get('cEmail') as UntypedFormControl;
  }

  goToBoard(): void {
    this.router.navigate([RoutingTypes.GIFT_WELCOME_ON_BOARD]).then();
  }

  setUpdate(event): void {
    this.cartService.addSenderData(
      this.about.get('name').value,
      this.about.get('surname').value,
      this.contact.get('email').value,
      this.contact.get('phone').value,
      this.marketingConsent.value,
      this.agree.value
    );
    this.pixelService.track('AddPaymentInfo');
    this.updated = event.selectedIndex !== 0;
  }

  ngAfterViewInit(): void {
    this.stepper._getIndicatorType = () => 'number';
  }

  startCheckout(): void {
    const totals: any = this.cartService.getTotal();
    this.track('begin_checkout', [
      this.asProduct(
        '', 'Gift', 'EUR', totals.totalCost, this.cartService.cartItems.length, '',
        'gifts', 'individual', 'gifts', 'Gifts'
      )
    ]);
  }
}
