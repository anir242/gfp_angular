import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-monthly-climate-subscription',
  templateUrl: './monthly-climate-subscription.component.html',
  styleUrls: ['./monthly-climate-subscription.component.scss']
})
export class MonthlyClimateSubscriptionComponent extends BaseComponent implements OnInit {

  isSmallScreen : boolean;

  customData = [
    {
      title: 'tools.title5',
      caption: "tools.description5",
      icon: "show-impact"
    },
    {
      title: 'tools.title3',
      caption: "tools.description3",
      icon: "live-experience"
    },
    {
      title: 'tools.title4',
      caption: "tools.description4",
      icon: "collect-ecosystems"
    },

  ]
  constructor(private breakpointObserver: BreakpointObserver) {
    super()
  }

  ngOnInit(): void {
    this.viewProduct();
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 991px)');
  }

  viewProduct() {
    this.track('view_item', [this.asProduct(
      'monthly-climate-subscription', 'Monthly Climate Subscription', 'EUR', 0, 1, 'subscription',
      'subscriptions', 'business', 'subscriptions', 'Subscriptions'
    )]);
  }

  goToCheckout(): void {
    this.router.navigate(['/subscriptions/individual/checkout'])
  }

}
