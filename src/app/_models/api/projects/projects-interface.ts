import {ImagesInterface, VideoInterface} from '../images-interface';
import {ProjectTypesInterface} from './project-types-interface';
import {CountryInterface} from '../country-interface';
import {ProjectDataInterface} from './project-data-interface';
import {UserProjectsInterface} from './user-projects-interface';

export interface ProjectsInterface {
  id: string;
  name: string;
  name_it: string;
  name_jp: string;
  slug: string;
  description: string;
  description_it: string;
  description_jp: string;
  imageId: string;
  miniatureImageId: string;
  videoId: string;
  orbify: string;
  countryId: string;
  createdById: string;
  status: string;
  languageCode: string;
  typeId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean;
  isSupportEnabled?: boolean;
  image?: ImagesInterface;
  miniatureImage?: ImagesInterface;
  video?: VideoInterface;
  type?: ProjectTypesInterface;
  country?: CountryInterface;
  projectData?: ProjectDataInterface;
  userProject?: UserProjectsInterface;
}
