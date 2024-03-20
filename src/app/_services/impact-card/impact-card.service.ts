import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImpactCardService extends BaseService{

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getUploadUrl = async () => {
    return await this.http.get(`${environment.publicApiUrl}/signedUrl`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  uploadImage = async (url: string, file: File) => {
    return await this.http.put(url, file, {
      headers: this.getFileUploadHeaders(),
    }).toPromise();
  }
}
