import {ImagesInterface} from '../images-interface';

export interface TeamInterface {
  id: string;
  creator: boolean;
  description: string;
  description_it: string;
  description_jp: string;
  firstname: string;
  lastname: string;
  imageId: string;
  role: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  image: ImagesInterface;
}
