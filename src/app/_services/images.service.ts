import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BaseService} from './_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  uploadImage = async (body: any) => {
    return await this.http.post(`${environment.authApiUrl}/images`, body, {
      headers: this.getRequestHeadersImage(),
    }).toPromise();
  }

  deleteImage = async (id: string) => {
    return await this.http.delete(`${environment.authApiUrl}/images/${id}`, {
      headers: this.getRequestHeadersImage(),
    }).toPromise();
  }
}
