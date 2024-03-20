import {CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {ToastrModule} from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MomentPipe} from '../../components/pipes/moment.pipe';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {SharedService} from '../../_services/shared.service';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AngularSvgIconModule, SvgIconRegistryService} from 'angular-svg-icon';
import {RatingComponent} from '../../components/rating/rating.component';
import {ShareButtonsPopupModule} from 'ngx-sharebuttons/popup';
import {ShareFriendsComponent} from '../../components/share-friends/share-friends.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProgressComponent} from '../../components/progress/progress.component';
import {SocialButtonsComponent} from '../../components/social-buttons/social-buttons.component';
import {DividerTextComponent} from '../../components/divider-text/divider-text.component';
import {FooterAuthenticationComponent} from '../../components/footer-authentication/footer-authentication.component';
import {BillingAddressComponent} from '../../components/billing-address/billing-address.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputComponent} from '../../components/mat-input/mat-input.component';
import {MatStepperModule} from '@angular/material/stepper';
import {YourPaymentMethodComponent} from '../../components/your-payment-method/your-payment-method.component';
import {NgxStripeModule} from 'ngx-stripe';
import {FlipCardComponent} from '../../pages/public/components/flip-card/flip-card.component';
import {MapComponent} from '../../components/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';
import {BreadcrumbComponent} from '../../components/breadcrumb/breadcrumb.component';
import {OrderSummaryComponent} from '../../components/order-summary/order-summary.component';
import {SummaryItemComponent} from '../../components/summary-item/summary-item.component';
import {ChipLabelComponent} from '../../components/chip-label/chip-label.component';
import {ProjectTypeResolver} from '../../_services/resolver/project-type.resolver';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {GiftEditComponent} from '../../pages/public/dialogs/gift-edit/gift-edit.component';
import {HighlightDivComponent} from '../../pages/public/components/highlight-div/highlight-div.component';
import {GiftPersonalizedTextComponent} from '../../pages/public/pages/gift-public/components/gift-personalized-text/gift-personalized-text.component';
import {GiftForComponent} from '../../pages/public/pages/gift-public/components/gift-for/gift-for.component';
import { GiftOccasionComponent } from '../../pages/public/pages/gift-public/components/gift-occasion/gift-occasion.component';
import { AchievementsDataComponent } from '../../pages/public/components/achievements-data/achievements-data.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BannerComponent} from '../../pages/public/components/banner/banner.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MailInputComponent} from '../../components/mail-input/mail-input.component';
import {UploadLogoComponent} from "../../components/upload-logo/upload-logo.component";
import {InfoComponent} from '../../components/info/info.component';
import {HotspotPopupComponent} from '../../components/hotspot-popup/hotspot-popup.component';
import {Co2OffsettedComponent} from '../../pages/admin/components/co2-offsetted/co2-offsetted.component';
import {RealDataComponent} from '../../pages/admin/components/real-data/real-data.component';
import {NgxFileDropModule} from "ngx-file-drop";
import { GlobeComponent } from '../../components/globe/globe.component';
import { EstimateClimatePioneerComponent } from '../../pages/public/pages/subscriptions-public/components/estimate-climate-pioneer/estimate-climate-pioneer.component';
import {SummaryUnitComponent} from '../../pages/public/pages/subscriptions-public/components/summary-unit/summary-unit.component';
import { PriceBreakdownComponent } from 'src/app/components/price-breakdown/price-breakdown.component';
import { WidgetTooltipComponent } from 'src/app/pages/public/components/widget-tooltip/widget-tooltip.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    MomentPipe,
    RatingComponent,
    ShareFriendsComponent,
    ProgressComponent,
    SocialButtonsComponent,
    DividerTextComponent,
    FooterAuthenticationComponent,
    BillingAddressComponent,
    MatInputComponent,
    YourPaymentMethodComponent,
    FlipCardComponent,
    MapComponent,
    OrderSummaryComponent,
    SummaryItemComponent,
    BreadcrumbComponent,
    ChipLabelComponent,
    HighlightDivComponent,
    GiftPersonalizedTextComponent,
    GiftForComponent,
    GiftOccasionComponent,
    BannerComponent,
    MailInputComponent,
    UploadLogoComponent,
    AchievementsDataComponent,
    GlobeComponent,
    Co2OffsettedComponent,
    RealDataComponent,
    InfoComponent,
    HotspotPopupComponent,
    EstimateClimatePioneerComponent,
    SummaryUnitComponent,
    PriceBreakdownComponent,
    WidgetTooltipComponent
  ],
  imports: [
    ShareButtonsPopupModule,
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AngularSvgIconModule,
    FormsModule,
    MatRadioModule,
    MatStepperModule,
    NgxStripeModule,
    GoogleMapsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    NgxFileDropModule,
    IvyCarouselModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxUiLoaderModule,
    ToastrModule,
    MatCheckboxModule,
    MomentPipe,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    AngularSvgIconModule,
    RatingComponent,
    ProgressComponent,
    SocialButtonsComponent,
    DividerTextComponent,
    FooterAuthenticationComponent,
    BillingAddressComponent,
    MatInputComponent,
    YourPaymentMethodComponent,
    MatStepperModule,
    NgxStripeModule,
    FlipCardComponent,
    MapComponent,
    OrderSummaryComponent,
    SummaryItemComponent,
    BreadcrumbComponent,
    ChipLabelComponent,
    ShareButtonsModule,
    ShareButtonsPopupModule,
    HighlightDivComponent,
    GiftPersonalizedTextComponent,
    GiftForComponent,
    GiftOccasionComponent,
    MatDatepickerModule,
    BannerComponent,
    MatButtonToggleModule,
    MatExpansionModule,
    MailInputComponent,
    UploadLogoComponent,
    AchievementsDataComponent,
    GlobeComponent,
    Co2OffsettedComponent,
    RealDataComponent,
    InfoComponent,
    HotspotPopupComponent,
    EstimateClimatePioneerComponent,
    SummaryUnitComponent,
    PriceBreakdownComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    SharedService,
    SvgIconRegistryService,
    ProjectTypeResolver,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInputComponent),
      multi: true
    },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fal);
  }
}
