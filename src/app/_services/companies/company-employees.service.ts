import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyEmployeesService  extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }


  updateCompanyEmployeesById = async (id: string, params: any) => {
    return await this.http.put(`${environment.authApiUrl}/companyEmployees/${id}`, params, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyEmployeeById = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companyEmployees/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyEmployees = async (params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/companyEmployees`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }

  getCompanyValues = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companyEmployees/${id}/co2Offsetted`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyPublicValues = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companyEmployees/${id}/co2Offsetted`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getCompanyOwner = async (companyId: string) => {
    return await this.http.get(`${environment.authApiUrl}/companyEmployees/${companyId}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

}
