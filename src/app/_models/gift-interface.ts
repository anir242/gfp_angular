import {GiftCardPacksInterface} from './api/public/gift-card-packs-interface';
import {SenderInterface} from './sender-interface';
import {OccasionsInterface} from './api/public/occasions-interface';
import {ImagesInterface} from './api/images-interface';
import {ProjectTypesInterface} from './api/projects/project-types-interface';

export interface GiftInterface {
  giftCardPack: GiftCardPacksInterface;
  type?: ProjectTypesInterface;
  recipientName: string;
  recipientEmail: string;
  deliveryDate: Date;
  message: string;
  image?: ImagesInterface;
  giftCardOccasion?: OccasionsInterface;
  sender?: SenderInterface;
}
