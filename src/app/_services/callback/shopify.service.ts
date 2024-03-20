import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  shopifyConnection = async (params) => {
    return await this.http.post(environment.apiUrl + '/shopify/connected', params, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  shopifyStartConnection = async (params?) => {
    return await this.http.post(environment.apiUrl + '/shopify/connect', params, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }
}
