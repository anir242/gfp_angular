import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {MainSubscriptionsComponent} from './pages/main-subscriptions/main-subscriptions.component';
import { SubscriptionsPublicRoutingModule } from './subscriptions-public-routing.module';
import { AuthenticationModule } from '../../../../pages/authentications/authentication.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {SubscriptionComponent} from './components/subscription/subscription.component';
import {SubscriptionGroupComponent} from './components/subscription-group/subscription-group.component';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {BusinessSubscriptionsComponent} from './pages/business-subscriptions/business-subscriptions.component';
import {ImpactEmployeesComponent} from './components/impact-employees/impact-employees.component';
import { BusinessCheckoutComponent } from './pages/business-checkout/business-checkout.component';
import { IndividualCheckoutComponent } from './pages/individual-checkout/individual-checkout.component';
import { BusinessSubscriptionTypeRecapComponent } from './components/business-subscription-type-recap/business-subscription-type-recap.component';
import { PioneerSelectorComponent } from './components/pioneer-selector/pioneer-selector.component';
import { EcommerceTypeComponent } from './components/ecommerce-type/ecommerce-type.component';
import {PublicModule} from '../../public.module';


@NgModule({
  declarations: [
    MainSubscriptionsComponent,
    SubscriptionComponent,
    SubscriptionGroupComponent,
    BusinessSubscriptionsComponent,
    ImpactEmployeesComponent,
    BusinessCheckoutComponent,
    IndividualCheckoutComponent,
    BusinessSubscriptionTypeRecapComponent,
    PioneerSelectorComponent,
    EcommerceTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicSharedModule,
    SubscriptionsPublicRoutingModule,
    PublicModule,
    AuthenticationModule
  ],
  exports: []
})
export class SubscriptionsPublicModule {
}
