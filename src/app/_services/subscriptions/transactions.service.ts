import { Injectable } from '@angular/core';
import { BaseService } from '../_base/base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  downloadInvoice = async (id) => {
    return await this.http
      .get(`${environment.authApiUrl}/transactions/${id}/downloadInvoice`, {
        headers: this.getRequestHeaders(),
      })
      .toPromise();
  };

  createTransaction = async (params) => {
    return await this.http
      .post(`${environment.authApiUrl}/transactions`, params, {
        headers: this.getRequestHeaders(),
      })
      .toPromise();
    }


  addSales = async (params: {
    subscriptionId: string;
    userId: string;
    quantity: number;
    value: number;
    currency: string;
    date: Date;
    status: string;
  }) => {
    return await this.http
      .post(`${environment.authApiUrl}/transactions/recharge`, params, {
        headers: this.getRequestHeaders(),
      })
      .toPromise();
  };
}
