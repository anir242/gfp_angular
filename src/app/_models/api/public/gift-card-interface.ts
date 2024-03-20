import {ImagesInterface} from '../images-interface';
import {ProjectTypesInterface} from '../projects/project-types-interface';
import {GiftCardOccasionsInterface} from './gift-card-occasions-interface';
import {GiftCardPacksInterface} from './gift-card-packs-interface';

export interface GiftCardInterface {
  id: string;
  title: string;
  title_it: string;
  description: string;
  description_it: string;
  content?: string;
  content_it?: string;
  imageId: string;
  typeId?: string;
  createdById: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  image?: ImagesInterface;
  type?: ProjectTypesInterface;
  giftCardPacks?: GiftCardPacksInterface[];
  giftCardOccasions?: GiftCardOccasionsInterface[];
}
