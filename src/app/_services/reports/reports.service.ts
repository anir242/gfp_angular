import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends BaseService {

  constructor(
    private http: HttpClient

  ) {
    super();
  }

  getCompanyReports = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/companies/${id}/reports`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  getUserReports = async (id: string) => {
    return await this.http.get(`${environment.authApiUrl}/users/${id}/reports`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }
}
