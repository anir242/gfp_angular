import {ImagesInterface} from '../images-interface';
import {ProjectTypesInterface} from '../projects/project-types-interface';
import {GiftCardOccasionsInterface} from './gift-card-occasions-interface';
import {UnitInterface} from './unit-interface';
import {GiftCardProjects} from './gift-card-projects';
import {GiftCardInterface} from "./gift-card-interface";

export interface GiftCardPacksInterface {
  id: string;
  giftCardId: string;
  giftCardValue: number;
  packTitle: string;
  status: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  giftCardProjects: GiftCardProjects[];
  giftCard?: GiftCardInterface;
}
