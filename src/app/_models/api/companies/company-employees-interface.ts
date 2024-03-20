import {RolesInterface} from '../roles/roles-interface';
import {SubscriptionTypesInterface} from '../subscriptions/subscription-types-interface';
import {SubscriptionsInterface} from '../subscriptions/subscriptions-interface';
import {CompanyInterface} from './company-interface';
import {UsersInterface} from '../users/users-interface';

export interface CompanyEmployeesInterface {
  id: string;
  companyId: string;
  userId: string;
  roleId: string;
  createdById: string;
  subscriptionTypeId: string;
  subscriptionId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
  slug?: string;
  role?: RolesInterface;
  subscriptionType?: SubscriptionTypesInterface;
  subscription?: SubscriptionsInterface;
  company?: CompanyInterface;
  user?: UsersInterface;
}
