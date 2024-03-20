import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InviteCodeService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  renewInviteCode = async (params) => {
    return await this.http.post(`${environment.publicApiUrl}/invite-codes/create`, params, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getMyInviteCodes = async () => {
    return await this.http.get(`${environment.publicApiUrl}/invite-codes`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }
}
