import {Component, Inject, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {StorageName} from '../../../../_models/components/storage-name';
import {OrderSummaryService} from '../../../../_services/public/local/order-summary.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {colorSets} from '@swimlane/ngx-charts';
import {CartTypes} from '../../../../_models/components/cart-types';
import {environment} from '../../../../../environments/environment';
import {FlowTypes} from '../../../../_models/components/flow-types';

@Component({
  selector: 'app-support-project',
  templateUrl: './support-project.component.html',
  styleUrls: ['./support-project.component.scss']
})
export class SupportProjectComponent extends BaseComponent implements OnInit {
  id: any;
  routingTypes = RoutingTypes;
  showSubscriptionPlans = environment.showSubscriptionPlans;
  buttonDisabled: boolean = true;
  constructor(
    private cartService: OrderSummaryService,
    private jwtHelperService: JwtHelperService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  check(event): void {
    this.id = event;
    this.buttonDisabled = false;
  }

  async goToDonations(): Promise<void> {
    this.addToCart();
    await this.router.navigate([
      RoutingTypes.PROJECTS_PUBLIC,
      this.data.slug,
      RoutingTypes.SINGLE_DONATIONS
    ], {queryParams: {id: this.id}});
    
  }

  setDisabled(event): void {
    this.buttonDisabled = !(this.id || event.index == 1)
  }

  addToCart(): void {
    this.track('add_to_cart', [
      this.asProduct(
        this.id, this.data.project?.name + ' Donation', 'EUR', 0, 1, this.id, 
        'singlePayments', this.data.project?.type?.slug, 'singlePayments', 'Single Payments'
      )
    ]);
  }

  goToSubscription(): void {
    let route = this.routingTypes.INDIVIDUAL_SUBSCRIPTION;
    if (localStorage.getItem('clientType') == '2') {
      route = this.routingTypes.BUSINESS_SUBSCRIPTION;
    }
    window.open(route);
  }
}
