import { Injectable } from '@angular/core';
import { BaseService } from '../_base/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SinglePaymentPacksService extends BaseService {
  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getPackBySlug = async (slug?: string, type?: string) => {
    let baseUrl = `${environment.publicApiUrl}/singlePaymentPacks/${slug}`;
    if(type) {  
      baseUrl += `?type=${type}`;
    }
    return await this.http.get(baseUrl, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }

  createSinglePaymentObject = async (payload: {
    packId: string,
    status?: string,
    quantity: number,
    price: number
  }) => {
    let headers: HttpHeaders;
    headers = this.getRequestHeaders();
    payload.quantity = +payload.quantity;
    payload.price = +payload.price;
    return await this.http.post<any>(`${environment.publicApiUrl}/singlePayments`,
      {...payload},
      { headers: headers}
    ).toPromise();
  }
}
