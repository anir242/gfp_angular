import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subscriptionId: string;
  private source = new BehaviorSubject<string>('');

  selectedAppId = this.source.asObservable();

  constructor() {
  }

  changedApp = (appId: string) => {
    this.source.next(appId);
  }
}
