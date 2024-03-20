import {ImagesInterface} from '../images-interface';
export interface ProjectsGoalsInterface {
  id?: string;
  type?: string;
  name?: string;
  imageId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: ImagesInterface;
}
