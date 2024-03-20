import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainSubscriptionsComponent} from './pages/main-subscriptions/main-subscriptions.component';
import {BusinessSubscriptionsComponent} from './pages/business-subscriptions/business-subscriptions.component';
import {SubscriptionsGroupResolver} from '../../../../_services/resolver/subscriptions-group.resolver';
import {BusinessCheckoutComponent} from './pages/business-checkout/business-checkout.component';
import {IndividualCheckoutComponent} from './pages/individual-checkout/individual-checkout.component';
import {WelcomeOnBoardComponent} from '../welcome-on-board/welcome-on-board.component';

const routes: Routes = [
  {
    path: '',
    component: MainSubscriptionsComponent,
    title: 'GFP | Subscriptions'
  },
  {
    path: 'business',
    data: {
      breadcrumb: 'breadcrumb.business'
    },
    children: [
      {
        path: ':slug',
        component: BusinessSubscriptionsComponent,
        data: {
          breadcrumb: (data) => {
            return `${data.sub?.name}`;
          }
        },
        resolve: {
          sub: SubscriptionsGroupResolver
        },
        title: 'GFP | Business Subscriptions'
      }
    ]
  },
  {
    path: 'business/:slug/checkout',
    data: {
      breadcrumb: 'breadcrumb.business'
    },
    component: BusinessCheckoutComponent,
    title: 'GFP | Business Checkout'
  },
  {
    path: 'individual/checkout',
    data: {
      breadcrumb: 'breadcrumb.individual'
    },
    component: IndividualCheckoutComponent,
    title: 'GFP | Individual Checkout'
  },
  {
    path: 'individual/checkout/:slug',
    data: {
      breadcrumb: 'breadcrumb.individual'
    },
    component: IndividualCheckoutComponent,
    title: 'GFP | Individual Checkout'
  },
  {
    path: 'welcomeOnBoard',
    component: WelcomeOnBoardComponent,
    title: 'GFP | Welcome on Board!'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsPublicRoutingModule {
}
