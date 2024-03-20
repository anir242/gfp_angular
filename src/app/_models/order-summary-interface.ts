import {ProjectTypesInterface} from './api/projects/project-types-interface';
import {UnitInterface} from './api/public/unit-interface';

export interface OrderSummaryInterface {
  id: string;
  quantity: number;
  internalType: string;
  projectId: string;
  projectSlug?: string;
  price: number;
  projectType?: ProjectTypesInterface;
  unit?: UnitInterface;
  subscriptionId?: string;
}
