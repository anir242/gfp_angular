import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProjectsService extends BaseService{
  constructor(
    private http: HttpClient
  ) {
    super();
  }
  getUserProjects = async (userId: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/users/${userId}/projects`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }

  getUserPublicProjects = async (userId: string, params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/users/${userId}/projects`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
}
