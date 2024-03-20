import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_base/base.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  login = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/login`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }

  loginSocial = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/login/social`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }

  loginPilio = async (email: string) => {
    return await this.http.get(`${environment.authApiUrl}/login/pilio?email=${email}`,  {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  signup = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/signup`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }
  signupV2 = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/V2/signup`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }
  passwordRecovery = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/passwordRecovery`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }
  resetPassword = async (params) => {
    return await this.http.post(`${environment.authApiUrl}/passwordRecovery/reset`, params, {
      headers: this.getRequestHeadersLogin()
    }).toPromise();
  }
}
