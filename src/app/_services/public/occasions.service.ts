import { Injectable } from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccasionsService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }
  getOccasions = async () => {
    return await this.http.get(`${environment.publicApiUrl}/occasions/`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
  getCurrentOccasion = async () => {
    return await this.http.get(`${environment.publicApiUrl}/occasions/current`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
