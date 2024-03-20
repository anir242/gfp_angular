import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {environment} from '../../../../../environments/environment';
import {UserTypes} from '../../../../_models/components/user-types';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent extends BaseComponent implements OnInit {
  showStartNowPlan = environment.showStartNowPlan;
  routingTypes = RoutingTypes;
  userTypes = UserTypes;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  start(): void{
    // this.router.navigate(RoutingTypes.REGISTER);
  }
}
