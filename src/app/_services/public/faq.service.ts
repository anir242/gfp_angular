import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }
  getFaqSections = async (params?: any) => {
    return await this.http.get(`${environment.publicApiUrl}/faqSections`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
  getMainFaq = async (params?: any) => {
    return await this.http.get(`${environment.publicApiUrl}/faqs`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
}