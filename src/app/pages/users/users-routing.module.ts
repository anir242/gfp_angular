import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountBillingComponent} from './pages/account-billing/account-billing.component';
import {SubscriptionsComponent} from './pages/subscriptions/subscriptions.component';
import {SinglePaymentsComponent} from './pages/single-payments/single-payments.component';
import {GiftCardsComponent} from './pages/gift-cards/gift-cards.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {LegalStuffComponent} from '../public/pages/legal-stuff/legal-stuff.component';
import {PrivacyPolicyComponent} from '../public/pages/legal-stuff/privacy-policy/privacy-policy.component';
import {ManageEmployeesComponent} from './pages/manage-employees/manage-employees.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {SubscriptionDetailsComponent} from './pages/subscription-details/subscription-details.component';
import {LegalStuff} from '../../_models/components/legal-stuff';

const routes: Routes = [
  {
    path: 'accountBilling',
    component: AccountBillingComponent,
    title: 'GFP | Account & Billing'
  },
  {
    path: 'subscriptions',
    children: [
      {
        path: '',
        component: SubscriptionsComponent,
      },
      {
        path: 'details',
        component: SubscriptionDetailsComponent,
        title: 'GFP | Subscription Details'
      }, {
        path: 'manageEmployees',
        component: ManageEmployeesComponent,
        title: 'GFP | Manage Employees'
      }
    ],
    title: 'GFP | My Subscriptions'
  },
  {
    path: 'singlePayments',
    component: SinglePaymentsComponent,
    title: 'GFP | My Donations'
  },
  {
    path: 'giftCards',
    component: GiftCardsComponent,
    title: 'GFP | My Gift Cards'
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    title: 'GFP | Invoices'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'GFP | Settings'
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
    title: 'GFP | Privacy Policy'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
