import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionTypeGroupsInterface} from '../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {MainSubscriptionsService} from '../../../../_services/subscriptions/main-subscriptions.service';
import {Response} from '../../../../_models/api/response';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-subscription-types',
  templateUrl: './subscription-types.component.html',
  styleUrls: ['./subscription-types.component.scss']
})
export class SubscriptionTypesComponent extends BaseComponent implements OnInit {
  subscriptionGroups: SubscriptionTypeGroupsInterface[] = [];
  constructor(
    private mainSubscriptionsService: MainSubscriptionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSubscriptions().then();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.subscriptionGroups.forEach(item => {
        item.description = item.description_it;
        item.businessDescription = item.businessDescription_it;
        item.businessSubtitle = item.businessSubtitle_it;
        item.advise = item.advise_it;
        item.howWorks = item.howWorks_it;
      });
    }
  }

  async getSubscriptions(): Promise<void> {
    try {
      const response: Response<SubscriptionTypeGroupsInterface[]> = await this.mainSubscriptionsService.getSubscriptionGroups('business');
      if (response.success) {
        this.subscriptionGroups = response.data;
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  goToSubs(): void{
    this.router.navigate([RoutingTypes.SUBSCRIPTIONS]);
  }
}
