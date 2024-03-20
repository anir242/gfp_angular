import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Response} from '../../_models/api/response';
import {MainSubscriptionsService} from '../subscriptions/main-subscriptions.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsGroupResolver implements Resolve<string> {
  constructor(
    private mainSubscriptionsService: MainSubscriptionsService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    try {
      const id = route.params.slug;
      const response: Response<string> = await this.mainSubscriptionsService.getMainSubscriptionName(id);
      if (response?.success) {
        return response.data;
      }
    } catch (e) {
      return '';
    }
  }
}
