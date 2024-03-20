import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../_modules/shared/shared.module';
import {AccountBillingComponent} from './pages/account-billing/account-billing.component';
import {SubscriptionsComponent} from './pages/subscriptions/subscriptions.component';
import {SinglePaymentsComponent} from './pages/single-payments/single-payments.component';
import {GiftCardsComponent} from './pages/gift-cards/gift-cards.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {LegalStuffComponent} from '../public/pages/legal-stuff/legal-stuff.component';
import {UsersRoutingModule} from './users-routing.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {SubscriptionDetailsComponent} from './pages/subscription-details/subscription-details.component';
import {ManageEmployeesComponent} from './pages/manage-employees/manage-employees.component';
import {InvoicesComponent} from './pages/invoices/invoices.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {SubscriptionInfoComponent} from './components/subscription-info/subscription-info.component';
import {SubscriptionDetailsBasicComponent} from './components/subscription-details-basic/subscription-details-basic.component';
import {SubscriptionDetailsSummaryComponent} from './components/subscription-details-summary/subscription-details-summary.component';
import {SubscriptionDetailsIncludedComponent} from './components/subscription-details-included/subscription-details-included.component';
import {SubscriptionDetailsSupportingComponent} from './components/subscription-details-supporting/subscription-details-supporting.component';
import { SubscriptionDetailsProjectsComponent } from './components/subscription-details-projects/subscription-details-projects.component';
import {SubscriptionTypeComponent} from './components/subscription-type/subscription-type.component';
import {SettingsToggleComponent} from './components/settings-component/settings-toggle.component';
import { GiftCardSentComponent } from './components/gift-card-sended/gift-card-sent.component';
import { SinglePaymentBoughtComponent } from './components/single-payment-bought/single-payment-bought.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        AccountBillingComponent,
        SubscriptionsComponent,
        SinglePaymentsComponent,
        GiftCardsComponent,
        SettingsComponent,
        SubscriptionDetailsComponent,
        ManageEmployeesComponent,
        InvoicesComponent,
        SubscriptionInfoComponent,
        SubscriptionDetailsBasicComponent,
        SubscriptionDetailsSummaryComponent,
        SubscriptionDetailsIncludedComponent,
        SubscriptionDetailsSupportingComponent,
        SubscriptionDetailsProjectsComponent,
        SubscriptionTypeComponent,
        SettingsToggleComponent,
        GiftCardSentComponent,
        SinglePaymentBoughtComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
        MatChipsModule,
        MatTabsModule
    ]
})
export class UsersModule {
}
