import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../_base/base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HubspotService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  submitForm = (params: any) => {
    const apiUrl =
      localStorage.getItem('clientType') === '2'
        ? `${environment.hubspotApiUrl}/${environment.hubspotPortalId}/${environment.hubspotBusinessFormId}`
        : `${environment.hubspotApiUrl}/${environment.hubspotPortalId}/${environment.hubspotIndividualFormId}`;

    return this.http.post(apiUrl, params, {
      headers: this.getHubspotRequestHeaders(),
    });
  };
}
