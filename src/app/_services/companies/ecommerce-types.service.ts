import { Injectable } from '@angular/core';
import {BaseService} from "../_base/base.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EcommerceTypesService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getEcommerceTypes = async (params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/ecommerceTypes/`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }
}
