import {ImagesInterface} from '../images-interface';
import {SubscriptionTypeGroupsInterface} from './subscription-type-groups-interface';
import {SubscriptionTypeValuesInterface} from './subscription-type-values-interface';
import {SubscriptionPriceInterface} from '../payments/price.interface';
import {CompanyEmployeesInterface} from "../companies/company-employees-interface";

export interface SubscriptionTypesInterface {
  id: string;
  groupId: string;
  imageId?: string;
  slug: string;
  name: string;
  name_it: string;
  description: string;
  description_it: string;
  productStripeId: string;
  costMonthly: number;
  costYearly: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  image?: ImagesInterface;
  group?: SubscriptionTypeGroupsInterface;
  subscriptionTypeValues?: SubscriptionTypeValuesInterface[];
  subscriptionPrices?: SubscriptionPriceInterface[];
  selectedPrice?: SubscriptionPriceInterface;
  subscriptionsTypes?: SubscriptionTypesInterface[];
  companyEmployees?: CompanyEmployeesInterface[];
  supported?: any;
  co2Values?: any[];
}
