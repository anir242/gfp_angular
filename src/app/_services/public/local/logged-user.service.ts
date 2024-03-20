import {EventEmitter, Injectable} from '@angular/core';
import {StorageName} from '../../../_models/components/storage-name';
import {BaseComponent} from '../../../pages/_base/base/base.component';
import {AuthService} from '../../_base/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService{
  logged: EventEmitter<void> = new EventEmitter();
  logout: EventEmitter<void> = new EventEmitter();
  getUsername(): any{
    if (localStorage.getItem(StorageName.username) && this.auth.isAuthenticated()){
      return localStorage.getItem(StorageName.username);
    }
  }
  constructor(
    public auth: AuthService
  ) {
  }
}
