import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeAppService extends BaseService {
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  invoices = async () => {
    return await this.http.get(`${environment.authApiUrl}/stripe/invoices`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  charges = async () => {
    return await this.http.get(`${environment.authApiUrl}/stripe/charges`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  paymentMethods = async () => {
    return await this.http.get(`${environment.authApiUrl}/stripe/paymentMethods`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  paymentMethod = async (body: any) => {
    let headers: HttpHeaders;
    headers = this.getRequestHeaders();
    return await this.http.post<any>(`${environment.authApiUrl}/stripe/paymentMethod`, body, {
      headers
    }).toPromise();
  }

  deletePaymentMethod = async (id: any) => {
    let headers: HttpHeaders;
    headers = this.getRequestHeaders();
    return await this.http.delete<any>(`${environment.authApiUrl}/stripe/paymentMethod/${id}`, {
      headers
    }).toPromise();
  }

  paymentIntent = async (isPublic: boolean, body: any) => {
    let headers: HttpHeaders;
    if (isPublic){
      headers = this.getPublicRequestHeaders();
    } else {
      headers = this.getRequestHeaders();
    }
    return await this.http.post(`${environment.authApiUrl}/stripe/paymentIntent`, body, {
      headers
    }).toPromise();
  }

  setupIntent = async (isPublic: boolean, body: any) => {
    let headers: HttpHeaders;
    if (isPublic){
      headers = this.getPublicRequestHeaders();
    } else {
      headers = this.getRequestHeaders();
    }
    return await this.http.post(`${environment.authApiUrl}/stripe/setupIntent`, body, {
      headers
    }).toPromise();
  }

  createSubscription = async (body: any) => {
    let headers: HttpHeaders;
    headers = this.getRequestHeaders();
    return await this.http.post(`${environment.authApiUrl}/stripe/createSubscription`, body, {
      headers
    }).toPromise();
  }

  giftCardPaymentIntent = async (body: any) => {
    return await this.http.post(`${environment.authApiUrl}/stripe/giftCardPaymentIntent`, body, {
      headers: this.getPublicRequestHeaders()
    }).toPromise();
  }

  getCustomer = async () => {
    return await this.http.get(`${environment.authApiUrl}/stripe/customer`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  saveTransaction = async (isPublic: boolean, body: any) => {
    let headers: HttpHeaders;
    if (isPublic){
      headers = this.getPublicRequestHeaders();
    } else {
      headers = this.getRequestHeaders();
    }

    return await this.http.post(`${environment.authApiUrl}/stripe/saveTransaction`, body, {
      headers
    }).toPromise();
  }

  cancelSubscriptions = async (id: string) => {
    return await this.http.post(`${environment.authApiUrl}/stripe/cancelSubscription`, {
      subscriptionId: id
    }, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
