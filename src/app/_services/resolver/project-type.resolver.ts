import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeResolver implements Resolve<string> {
  constructor(private translate: TranslateService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    const id = route.params.slug;
    const value = this.translate.instant('breadcrumb.' + id);
    return value;
  }
}
