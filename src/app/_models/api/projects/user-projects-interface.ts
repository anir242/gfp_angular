import {ProjectsInterface} from './projects-interface';

export interface UserProjectsInterface {
  id: string;
  projectId: string;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  project?: ProjectsInterface;
}
