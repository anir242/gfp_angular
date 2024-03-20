import {Injectable} from '@angular/core';
import {BaseService} from '../../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getUserByEmail = (email: string) => {

    const encodedEmail = encodeURIComponent(email);
    const url = `${environment.authApiUrl}/users?email=${encodedEmail}`;
    return this.http.get(encodeURI(url), {
      headers: this.getPublicRequestHeaders(),
    });
  }

}
