import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CompanyPublicRoutingModule } from './company-public-routing.module';
import { CompanyPublicComponent } from './pages/company-public.component';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import { PublicSharedModule } from '../../modules/public-shared/public-shared.module';
import { AdminModule } from '../../../admin/admin.module'
import {GoogleMapsModule} from '@angular/google-maps';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CompanyPublicComponent,
  ],
    imports: [
        CommonModule,
        CompanyPublicRoutingModule,
        SharedModule,
        PublicSharedModule,
        GoogleMapsModule,
        MatButtonToggleModule,
        MatExpansionModule,
        ScrollingModule,
        AdminModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CompanyPublicComponent,
  ]
})
export class CompanyPublicModule {
}
