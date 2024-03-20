import {SinglePaymentPacksInterface} from './single-payment-packs-interface';

export interface SinglePaymentsInterface {
  id: string;
  packId?: string;
  quantity?: number;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
  pack?: SinglePaymentPacksInterface;
  co2?: number;
}
