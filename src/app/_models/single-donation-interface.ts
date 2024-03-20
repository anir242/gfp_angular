import {ProjectsInterface} from './api/projects/projects-interface';
import {UnitInterface} from './api/public/unit-interface';
import {SinglePaymentPacksInterface} from './api/public/single-payment-packs-interface';
import {SinglePaymentsInterface} from './api/public/single-payments-interface';
import {BillingAddressInterface} from './billing-address-interface';

export interface SingleDonationInterface {
  unit: UnitInterface;
  paymentPack: SinglePaymentsInterface;
  project: ProjectsInterface;
  sameAsCompany?: boolean;
  promoCode?: string;
  billingAddress?: BillingAddressInterface;
}
