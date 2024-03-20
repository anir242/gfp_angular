import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseService} from '../_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypologyService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getProjectTypeBySlug = async (slug: string) => {
    return await this.http.get(`${environment.publicApiUrl}/public/projectTypes/${slug}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  getProjectTypes = async () => {
    return await this.http.get(`${environment.publicApiUrl}/public/projectTypes`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
