import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionTypeGroupsInterface} from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {Router} from '@angular/router';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';

@Component({
  selector: 'app-subscription-group',
  templateUrl: './subscription-group.component.html',
  styleUrls: ['./subscription-group.component.scss']
})
export class SubscriptionGroupComponent implements OnInit {
  @Input() group: SubscriptionTypeGroupsInterface;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  openSubscriptionGroup = async (id: any) => {
    await this.router.navigate([RoutingTypes.BUSINESS_SUB, id]);
  }
}
