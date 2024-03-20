import { CompanyAddressesInterface } from '../companies/company-addresses-interface';

export interface BillingDetailsInterface {
  address?: CompanyAddressesInterface;
  email: string;
  name: string;
  phone?: string;
}
