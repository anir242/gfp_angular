import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/_services/_base/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersPublicService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super()
   }

  getPublicClientPartners = async () => {
    return await this.http.get(`${environment.publicApiUrl}/clientsPartners`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getPublicPartners = async (params?:any) => {
    return await this.http.get(`${environment.publicApiUrl}/public/partners`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
}
