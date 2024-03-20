import {UnitInterface} from './unit-interface';
import {ProjectsInterface} from '../projects/projects-interface';

export interface GiftCardProjects {
  id: string;
  giftCardPackId: string;
  projectId: string;
  quantity: number;
  unitId: string;
  status: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  unit: UnitInterface;
  project: ProjectsInterface;
}
