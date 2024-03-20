import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../_base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  addContact = (params: any) => {
    return this.http.post(`${environment.publicApiUrl}/contacts`, params, {
      headers: this.getPublicRequestHeaders(),
    });
  };
}
