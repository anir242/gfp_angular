import {GiftCardPacksInterface} from './gift-card-packs-interface';
import {TransactionInterface} from "../transaction-interface";


export interface GiftCardRecipientInterface {
  id: string;
  giftCardPackId: string;
  occasionId: string;
  customImageId: string;
  customMessage: string;
  deliveryDate: Date;
  recipientEmail: string;
  recipientName: string;
  senderEmail: string;
  senderFirstname: string;
  senderLastname: string;
  senderPhoneNumber: string;
  redirectToken: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  giftCardPack: GiftCardPacksInterface;
  transaction?: TransactionInterface;
}
