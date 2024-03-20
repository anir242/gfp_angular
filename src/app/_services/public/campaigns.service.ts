import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getCampaigns = async () => {
    return await this.http.get(`${environment.publicApiUrl}/campaigns`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
