import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BaseService} from '../_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CountersPublicService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getPublicCounters = async (params?: any) => {
    return await this.http.get(`${environment.publicApiUrl}/public/counters`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
}
