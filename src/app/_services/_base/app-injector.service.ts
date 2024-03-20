import {Injectable, Injector} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInjectorService {
  private static inj: Injector;

  static set injector(injector: Injector) {
    this.inj = injector;
  }

  static get injector(): Injector {
    return this.inj;
  }

}
