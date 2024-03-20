import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {BusinessPublicRoutingModule} from './business-public-routing.module';
import {ApiAvailableComponent} from './components/api-available/api-available.component';
import {AdditionalServicesComponent} from './components/additional-services/additional-services.component';
import {
  AdditionalServicesCardComponent
} from './components/additional-services-card/additional-services-card.component';
import {CampaignsComponent} from './components/campaigns/campaigns.component';
import {CampaignItemComponent} from './components/campaign-item/campaign-item.component';
import {PartnersComponent} from './components/partners/partners.component';
import {ApiStepItemComponent} from './components/api-step-item/api-step-item.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ApiAvailableComponent,
    AdditionalServicesComponent,
    AdditionalServicesCardComponent,
    CampaignsComponent,
    CampaignItemComponent,
    PartnersComponent,
    ApiStepItemComponent
  ],
  exports: [
    AdditionalServicesComponent,
    ApiAvailableComponent,
    CampaignsComponent,
    PartnersComponent,
    ApiStepItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicSharedModule,
    BusinessPublicRoutingModule,
    MatGridListModule,
  ]
})
export class BusinessPublicModule {
}
