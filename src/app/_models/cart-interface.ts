import {SingleDonationInterface} from './single-donation-interface';
import {GiftInterface} from './gift-interface';
import {SubscriptionTypeValuesInterface} from './api/subscriptions/subscription-type-values-interface';

export interface CartInterface {
  id: string; // packId
  name: string;
  internalType: string;
  singleDonation?: SingleDonationInterface;
  gift?: GiftInterface;
  subscriptions?: {
    id: string,
    name: string,
    quantity: number,
    projects: SubscriptionTypeValuesInterface[],
    cost: number,
    frequency?: string,
    priceId?: string,
    type?: string
  }[];
}
