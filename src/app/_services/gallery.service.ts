import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BaseService} from './_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getGallery = async (slug?: string) => {
    return await this.http.get(`${environment.authApiUrl}/projects/${slug}/gallery`, {
      headers: this.getRequestHeaders(),
    }).toPromise();
  }

  getGalleryPublic = async (slug?: string) => {
    return await this.http.get(`${environment.authApiUrl}/public/projects/${slug}/gallery`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
