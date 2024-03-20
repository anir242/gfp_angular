import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MonthlyClimateSubscriptionComponent } from './pages/monthly-climate-subscription/monthly-climate-subscription.component';
import { MonthlyClimateSubscriptionRoutingModule } from './montly-climate-subscription-routing.module';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import { PersonalPlanCardComponent } from './components/personal-plan-card/personal-plan-card.component';
import { FamilyPlanCardComponent } from './components/family-plan-card/family-plan-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PublicModule } from '../../public.module';
@NgModule({
    declarations: [
        MonthlyClimateSubscriptionComponent,
        PersonalPlanCardComponent,
        FamilyPlanCardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PublicSharedModule,
        MatExpansionModule,
        MonthlyClimateSubscriptionRoutingModule,
        PublicModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MonthlyClimateSubscriptionModule { }