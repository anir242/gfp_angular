import {ProjectsInterface} from '../projects/projects-interface';
import {UnitInterface} from './unit-interface';
import {SinglePaymentsInterface} from './single-payments-interface';
import {ProviderInterface} from '../ledger/provider-interface';

export interface SinglePaymentPacksInterface {
  id: string;
  projectId?: string;
  providerId?: string;
  unitId?: string;
  certified?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  project?: ProjectsInterface;
  unit?: UnitInterface;
  singlePayments?: SinglePaymentsInterface[];
  provider?: ProviderInterface;
}
