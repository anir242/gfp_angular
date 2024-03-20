import {ImagesInterface} from '../images-interface';
export interface ProjectsPartnersInterface {
  id?: string;
  type?: string;
  name?: string;
  description?: string;
  description_it?: string;
  imageId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: ImagesInterface;
  url?: string;
}
