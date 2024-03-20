import {ImagesInterface} from '../images-interface';
import {ProjectTypesInterface} from '../projects/project-types-interface';
import {OccasionsInterface} from './occasions-interface';

export interface GiftCardOccasionsInterface {
  id: string;
  giftCardId: string;
  occasionId: string;
  status: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  occasion: OccasionsInterface;
}
