import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseService} from '../_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService  extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  subscribeNewsletter = async (params: any) => {
    return await this.http.post(`${environment.publicApiUrl}/public/newsletter`, params, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
