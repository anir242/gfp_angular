import {ImagesInterface} from '../images-interface';

export interface EcommerceTypeInterface {
  id: string;
  slug: string;
  imageId: string;
  image?: ImagesInterface;
  status: string;
}
