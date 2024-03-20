import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GiftComponent} from './pages/gift/gift.component';
import {GiftRoutingModule} from './gift-routing.module';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {GiftDetailsComponent} from './pages/gift-details/gift-details.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {GiftContactInfoComponent} from './components/gift-contact-info/gift-contact-info.component';
import {GiftSummaryComponent} from './components/gift-summary/gift-summary.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {GiftPickInfoComponent} from './components/gift-pick-info/gift-pick-info.component';
import {GiftCartComponent} from './pages/gift-cart/gift-cart.component';
import {GiftCheckOutComponent} from './pages/gift-check-out/gift-check-out.component';
import {GiftAboutComponent} from './components/gift-about/gift-about.component';
import {GiftPaymentMethodComponent} from './components/gift-payment-method/gift-payment-method.component';


@NgModule({
  declarations: [
    GiftComponent,
    GiftDetailsComponent,
    GiftContactInfoComponent,
    GiftSummaryComponent,
    GiftPickInfoComponent,
    GiftCartComponent,
    GiftCheckOutComponent,
    GiftAboutComponent,
    GiftPaymentMethodComponent,
  ],
  imports: [
    CommonModule,
    GiftRoutingModule,
    SharedModule,
    PublicSharedModule,
    MatExpansionModule,
    NgxFileDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GiftModule {
}
