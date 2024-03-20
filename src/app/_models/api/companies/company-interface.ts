import {RolesInterface} from '../roles/roles-interface';
import {SubscriptionTypesInterface} from '../subscriptions/subscription-types-interface';
import {SubscriptionsInterface} from '../subscriptions/subscriptions-interface';

export interface CompanyInterface {
  id: string;
  companyEmail: string;
  createdById: string;
  name: string;
  logoId: string;
  status: string;
  type: null;
  slug?: string;
  vatNumber: string;
  createdAt: Date;
  updatedAt: Date;
  pec: string;
  pilio?: number;
}
