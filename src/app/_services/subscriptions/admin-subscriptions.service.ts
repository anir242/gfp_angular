import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminSubscriptionsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  findAll = async (params?: any) =>  {
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypes`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }

}
