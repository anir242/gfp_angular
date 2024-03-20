import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {
  }

  public isAuthenticated() : boolean {
    // Get token from localstorage
    const token = localStorage.getItem('token');
    // Check if token is null or empty
    if (token && token !== undefined) {
      // Check whether the token is expired and return
      // true or false
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public async isAuthenticatedSync() {
    // Get token from localstorage
    const token = await localStorage.getItem('token');
    // Check if token is null or empty
    if (token && token !== undefined) {
      // Check whether the token is expired and return
      // true or false
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }

  }

}
