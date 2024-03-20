import { CardInterface } from './card-interface';
import { BillingDetailsInterface } from './billing-details-interface';

export interface PaymentMethodInterface {
  id: string;
  customer: string;
  created: number;
  card?: CardInterface;
  billing_details: BillingDetailsInterface;
}
