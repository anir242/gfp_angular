import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BaseService} from './_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class NativaApiService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  createTransaction = async (body) => {
    return await this.http.post(`${environment.authApiUrl}/nativa/transaction`, body,
      {
        headers: this.getRequestHeaders(),
      }
    ).toPromise();
  }
}
