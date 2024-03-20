import {SinglePaymentsInterface} from "./public/single-payments-interface";
import {SubscriptionsInterface} from "./subscriptions/subscriptions-interface"

export interface TransactionInterface {
  id: string;
  userId: string;
  stripeId: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  visibleFromDate: Date;
  createdAt: Date;
  singlePayment: SinglePaymentsInterface;
  subscription?: SubscriptionsInterface;
}
