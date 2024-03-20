import {ImagesInterface} from '../images-interface';
import {ProjectsInterface} from './projects-interface';

export interface ProjectGalleryInterface {
  id: string;
  imageId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  image?: ImagesInterface;
  project?: ProjectsInterface;
}
