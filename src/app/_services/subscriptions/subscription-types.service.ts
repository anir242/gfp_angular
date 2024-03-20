import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypesService  extends  BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  findOne = async (slug: string) => {
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypes/${slug}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
