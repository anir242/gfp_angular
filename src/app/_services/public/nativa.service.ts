import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseService } from '../_base/base.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NativaService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  verifyToken = (params: {token: string}) => {
    return  this.http.post(`${environment.publicApiUrl}/nativa/verifyToken`, params, {
      headers: this.getPublicRequestHeaders(),
    }).pipe(catchError(this.handleError));
  };

  private handleError = (error: any) => {
    return throwError(() => {
      return error;
    });
  }

}
