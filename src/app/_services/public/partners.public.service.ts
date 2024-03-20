import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersPublicService extends BaseService {

  constructor(
    private http: HttpClient
) {
    super();
  }

  getPublicPartners = async () => {
    return await this.http.get(`${environment.publicApiUrl}/public/partners`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  getPublicPartnersBySlug = async (params) => {
    return await this.http.get(`${environment.publicApiUrl}/public/partners`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
  getPublicClientPartners = async () => {
    return await this.http.get(`${environment.publicApiUrl}/clientsPartners`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
