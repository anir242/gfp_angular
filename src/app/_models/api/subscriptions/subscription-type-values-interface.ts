import {UnitInterface} from '../public/unit-interface';
import {ProjectsInterface} from '../projects/projects-interface';
import {SubscriptionTypesInterface} from './subscription-types-interface';

export interface SubscriptionTypeValuesInterface {
  id: string;
  subscriptionTypeId: string;
  projectId: string;
  unitId: string;
  co2Certified: boolean;
  allocation: number;
  quantity: number;
  status: string;
  createdById: string;
  updatedById: string;
  createdAt: Date;
  updatedAt: Date;
  unit?: UnitInterface;
  project?: ProjectsInterface;
  initialQuantity?: number;
  subscriptionType?: SubscriptionTypesInterface
}
