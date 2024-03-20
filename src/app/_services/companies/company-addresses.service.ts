import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CompanyAddressesService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  updateAddressById = async (id: string, params?: any) => {
    return await this.http.patch(`${environment.authApiUrl}/companyAddresses/${id}`, params, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyAddresses = async (params: any) => {
    return await this.http.get(`${environment.authApiUrl}/companyAddresses/`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }
}
