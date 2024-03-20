import {ImagesInterface} from '../images-interface';

export interface OccasionsInterface {
  id: string;
  title: string;
  title_it: string;
  selectorName?: string;
  selectorName_it?: string;
  description: string;
  description_it: string;
  color: string;
  iconImageId: string;
  placeholderImageId: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  iconImage?: ImagesInterface;
  placeholderImage?: ImagesInterface;
}
