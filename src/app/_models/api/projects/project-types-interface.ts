import {ProjectsInterface} from './projects-interface'

export interface ProjectTypesInterface {
  id: string;
  name: string;
  name_it: string;
  name_jp: string;
  slug: string;
  description: string;
  description_it: string;
  description_jp: string;
  status: string;
  colorLabel: string;
  createdById: string;
  colorSecondary: string;
  projects?: ProjectsInterface[];
  createdAt: Date;
  updatedAt: Date;
}
