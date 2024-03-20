import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }
  sendEmployeesList = async (params) => {
    return await this.http.post(`${environment.apiUrl}/invitations`, params, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  acceptInvitation = async (params) => {
    return await this.http.post(`${environment.publicApiUrl}/invitations/accept`, params, {
      headers: this.getRequestHeadersLogin(),
    }).toPromise();
  }

  getMyInvitations = async () => {
    return await this.http.get(`${environment.publicApiUrl}/invitations`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
