import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getProviders = async () => {
    return await this.http.get(`${environment.publicApiUrl}/ledger/providers`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
