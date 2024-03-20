import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiftService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getGiftCards = async () => {
    return await this.http.get(`${environment.publicApiUrl}/giftCards`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getGiftCardsById = async (id: string) => {
    return await this.http.get(`${environment.publicApiUrl}/giftCards/${id}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getGiftCardUsers = async (token: string) => {
    return await this.http.get(`${environment.publicApiUrl}/giftCardUsers/${token}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  getGiftCardUsersFromRegistration = async (token: string) => {
    return await this.http.get(`${environment.publicApiUrl}/giftCardUsers/${token}/register`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
