import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainSubscriptionsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getMainSubscription = async (params ?: any) => {
    params.languageCode = navigator.language;
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypeGroups`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }

  getMainSubscriptionName = async (slug: string) => {
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypeGroups/${slug}/name`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getMainSubscriptionBySlug = async (slug: string) => {
    const language = navigator.language;
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypeGroups/${slug}`, {
      headers: this.getPublicRequestHeaders(),
      params: {
        languageCode: language
      }
    }).toPromise();
  }

  getSubscriptionGroups = async (type: string) => {
    return await this.http.get(`${environment.authApiUrl}/subscriptionTypeGroups`, {
      headers: this.getPublicRequestHeaders(),
      params: {
        type
      }
    }).toPromise();
  }

}
