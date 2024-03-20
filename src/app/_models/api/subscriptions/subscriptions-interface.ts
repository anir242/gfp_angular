import {SubscriptionTypesInterface} from './subscription-types-interface';
import {CompanyInterface} from '../companies/company-interface';
import {UsersInterface} from '../users/users-interface';

export interface SubscriptionsInterface {
  id: string;
  subscriptionTypeId: string;
  companyId: string;
  percentageToDonate: number;
  itemsSold: number;
  plantPerItems: number;
  stripeId: string;
  createdBy: UsersInterface;
  company: CompanyInterface;
  status: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionType?: SubscriptionTypesInterface;
}
