import {ImagesInterface} from '../images-interface';
import {SubscriptionTypesInterface} from './subscription-types-interface';

export interface SubscriptionTypeGroupsInterface {
  id: string;
  name: string;
  description: string;
  description_it: string;
  businessDescription: string;
  businessDescription_it: string;
  businessSubtitle: string;
  businessSubtitle_it: string;
  advise: string;
  advise_it: string;
  howWorks: string;
  howWorks_it: string;
  languageCode: string;
  type: string;
  imageId: string;
  slug: string;
  status: string;
  createdBy: string;
  images?: ImagesInterface;
  subscriptionsTypes?: SubscriptionTypesInterface[];
}
