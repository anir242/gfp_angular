import {RolesInterface} from '../roles/roles-interface';
import {CompanyEmployeesInterface} from '../companies/company-employees-interface';

export interface UsersInterface {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  type: string;
  password: string;
  roleId: string;
  status: string;
  customerStripeId?: string;
  lastAccess: Date;
  createdAt: string;
  updatedAt: Date;
  role?: RolesInterface;
  companyEmployee?: CompanyEmployeesInterface;
  imageUrl?: string;
  pilio?: number;
  pilioLastAccess?: Date;
}
