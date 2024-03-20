import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SubscriptionTypesInterface} from '../../_models/api/subscriptions/subscription-types-interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  create = async (body: any) =>  {
    return await this.http.post(`${environment.authApiUrl}/subscriptions`, body, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  findEmployees = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/subscriptions/${id}/employees`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
  getSubscriptionDetails = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/subscriptions/${id}/details`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
