import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getCompanyById = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getCompanySubscriptions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/subscriptions`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyTransactions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/transactions`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getCompanyCounters = async (id: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/counters`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }
  getCompanySubscriptionsById = async (companyId: string, subscriptionId: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${companyId}/subscriptions/${subscriptionId}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyPublicById = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getCompanyPublicIdBySlug = async (slug: string) => {
    return await this.http.get<any>(`${environment.authApiUrl}/companies/${slug}/id`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getCompanyPublicSubscriptions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/subscriptions`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getCompanyPublicTransactions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/transactions`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  getCompanyPublicCounters = async (id: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/counters`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
  getCompanyPublicSubscriptionsById = async (companyId: string, subscriptionId: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${companyId}/subscriptions/${subscriptionId}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  updateCompanyById = async (id: string, params?: any) => {
    return await this.http.patch(`${environment.authApiUrl}/companies/${id}`, params, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
