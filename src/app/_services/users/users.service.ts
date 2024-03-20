import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  updateUserById = async (id: string, params?: any) => {
    return await this.http.patch(`${environment.authApiUrl}/users/${id}`, params, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserById = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getUserByEmail = async (email: string) => {
    return await this.http.get(`${environment.authApiUrl}/users?email=${email}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getCompanyOwnerById = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  getUserSubscriptions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/subscriptions`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserSubscriptionsById = async (userId: string, id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${userId}/subscriptions/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserGiftCards = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/gifts`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserSinglePayment = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/singleDonations`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserTransactions = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/transactions`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getUserCounters = async (id: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/counters`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }
  getUserCountersMonthly = async (id: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/counters/monthly`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }
  deleteUser = async (id: string) => {
    return await this.http.delete(`${environment.authApiUrl}/users/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  redeemGifts = async () => {
    return await this.http.patch(`${environment.authApiUrl}/users/redeem/gifts`, {}, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getUserBillingAddress = async () => {
    return await this.http.get(`${environment.authApiUrl}/users/billingAddress`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  updateUserBillingAddress = async (id: string, data: any) => {
    return await this.http.patch(`${environment.authApiUrl}/users/billingAddress`, data, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getTransactionsByPackId = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/transactions/${id}`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
