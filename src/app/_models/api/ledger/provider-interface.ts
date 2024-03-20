import {UsersInterface} from '../users/users-interface';
import {ImagesInterface} from '../images-interface';
import {SinglePaymentPacksInterface} from '../public/single-payment-packs-interface';

export interface ProviderInterface {
  id: string;
  name: string;
  slug: string;
  description: string;
  description_it: string;
  country: string;
  imageId: string;
  url: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  image: ImagesInterface;
  packs: SinglePaymentPacksInterface[];
}
