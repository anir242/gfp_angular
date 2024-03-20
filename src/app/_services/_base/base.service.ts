import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageName } from '../../_models/components/storage-name';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  protected getRequestHeadersLogin = (): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${environment.loginApiToken}`,
    });
  };

  protected getPublicRequestHeaders = (): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${environment.publicApiToken}`,
    });
  };

  protected getRequestHeadersImage = (): HttpHeaders => {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem(StorageName.token)}`,
    });
  };

  protected getRequestHeaders = (): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem(StorageName.token)}`,
    });
  };

  protected getHubspotRequestHeaders = (): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.hubspotApiKey}`,
    });
  };

  protected getFileUploadHeaders = (): HttpHeaders => {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'image/jpeg'
    })
  }
}
