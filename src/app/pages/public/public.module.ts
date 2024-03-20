import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {LandingPublicComponent} from './pages/landing-public/landing-public.component';
import {PublicRoutingModule} from './public-routing.module';
import {SharedModule} from '../../_modules/shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {GoogleMapsModule} from '@angular/google-maps';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {ToolsComponent} from './components/tools/tools.component';
import {IncludedComponent} from './components/included/included.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MakeGiftComponent} from './components/make-gift/make-gift.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AuthenticationModule } from '../authentications/authentication.module';
import {PowerComponent} from './components/power/power.component';
import {PlansComponent} from './components/plans/plans.component';
import {UnsureComponent} from './components/unsure/unsure.component';
import {SupportValueComponent} from './components/support-value/support-value.component';
import {SingleDonationsComponent} from './pages/single-donations/single-donations.component';
import {SupportProjectComponent} from './dialogs/support-project/support-project.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { SingleDonationSummaryComponent } from '../authentications/components/single-donation-summary/single-donation-summary.component';
import {WelcomeOnBoardComponent} from './pages/welcome-on-board/welcome-on-board.component';
import {PublicSharedModule} from './modules/public-shared/public-shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {BillingAddressSummaryComponent} from './components/billing-address-summary/billing-address-summary.component';
import {FilterPopupComponent} from './components/filter-popup/filter-popup.component';
import {BannerDialogComponent} from './dialogs/banner-dialog/banner-dialog.component';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {WhyJoinComponent} from './pages/business-public/pages/why-join/why-join.component';
import {ApiIntegrationComponent} from './pages/business-public/pages/api-integration/api-integration.component';
import {ProgressScrollerComponent} from './components/progress-scroller/progress-scroller.component';
import {SubscriptionTypesComponent} from './components/subscription-types/subscription-types.component';
import {BusinessPublicModule} from './pages/business-public/business-public.module';
import {BlogModule} from './pages/blog/blog.module';
import {LegalStuffComponent} from './pages/legal-stuff/legal-stuff.component';
import {TermsConditionsComponent} from './pages/legal-stuff/terms-conditions/terms-conditions.component';
import {CookiePolicyComponent} from './pages/legal-stuff/cookie-policy/cookie-policy.component';
import {PrivacyPolicyComponent} from './pages/legal-stuff/privacy-policy/privacy-policy.component';
import {HomepagePopupComponent} from './components/homepage-popup/homepage-popup.component';
import {FaqComponent} from './pages/faq/faq.component';
import {FaqItemComponent} from './components/faq-item/faq-item.component';
import { MainFaqComponent } from './components/main-faq/main-faq.component';
import { GalleryManagerPublicComponent } from './components/gallery/gallery-manager/gallery-manager.component';
import { ReviewPublicComponent } from './components/review-public/review-public.component';
import { ExploreComponent } from './components/explore/explore.component';
import { BusinessSolutionsComponent } from './components/business-solutions/business-solutions.component';
import { ProjectComponent } from './components/project/project.component';
import { ToolsPublicComponent } from './components/tools-public/tools-public.component';
import { CarbonDioxideOffsetComponent } from './components/carbon-dioxide-offset/carbon-dioxide-offset.component';
import { CheckoutOffsetComponent } from './components/checkout-offset/checkout-offset.component';
import { ProviderOffsetComponent } from './components/provider-offset/provider-offset.component';
import { ProjectOffsetComponent } from './components/project-offset/project-offset.component';
import { PartnersPublicComponent } from './pages/partners-public/partners-public.component';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { EcommApiPublicComponent } from './pages/ecomm-api-public/ecomm-api-public.component';
import { ClimatePositiveSubscriptionComponent } from './pages/climate-positive-subscription/climate-positive-subscription.component';
import { DonationContactUsComponent } from './components/donation-contact-us/donation-contact-us.component';
import { NativaLandingComponent } from './pages/nativa-landing/nativa-landing.component';
import { EuroCurrencyFormatPipe, EuroNumberFormatPipe } from 'src/app/pipes/euro-format.pipe';
import { BusinessPilioComponent } from './components/business-pilio/business-pilio.component';
import { CarbonNeutralSolutionsComponent } from './pages/carbon-neutral-solutions/carbon-neutral-solutions.component';
import { CarbonFootprintManagementComponent } from './pages/carbon-footprint-management/carbon-footprint-management.component';
import { EnvironmentalSustainabilityAdvisoryComponent } from './pages/environmental-sustainability-advisory/environmental-sustainability-advisory.component';
import { NativaWelcomeComponent } from './pages/nativa-welcome/nativa-welcome.component';

@NgModule({
  declarations: [
    LandingPublicComponent,
    ToolsComponent,
    IncludedComponent,
    MakeGiftComponent,
    PowerComponent,
    PlansComponent,
    UnsureComponent,
    SupportValueComponent,
    SingleDonationsComponent,
    SupportProjectComponent,
    SingleDonationSummaryComponent,
    WelcomeOnBoardComponent,
    BillingAddressSummaryComponent,
    FilterPopupComponent,
    BannerDialogComponent,
    WhyJoinComponent,
    ApiIntegrationComponent,
    ProgressScrollerComponent,
    SubscriptionTypesComponent,
    LegalStuffComponent,
    TermsConditionsComponent,
    CookiePolicyComponent,
    PrivacyPolicyComponent,
    HomepagePopupComponent,
    FaqComponent,
    FaqItemComponent,
    MainFaqComponent,
    GalleryManagerPublicComponent,
    ReviewPublicComponent,
    ExploreComponent,
    BusinessSolutionsComponent,
    ProjectComponent,
    ToolsPublicComponent,
    CarbonDioxideOffsetComponent,
    CheckoutOffsetComponent,
    ProviderOffsetComponent,
    ProjectOffsetComponent,
    PartnersPublicComponent,
    CaseStudiesComponent,
    EcommApiPublicComponent,
    ClimatePositiveSubscriptionComponent,
    DonationContactUsComponent,
    NativaLandingComponent,
    EuroCurrencyFormatPipe,
    EuroNumberFormatPipe,
    BusinessPilioComponent,
    CarbonNeutralSolutionsComponent,
    CarbonFootprintManagementComponent,
    EnvironmentalSustainabilityAdvisoryComponent,
    NativaWelcomeComponent
  ],
  imports: [
    SharedModule,
    PublicSharedModule,
    PublicRoutingModule,
    NgxChartsModule,
    MatGridListModule,
    ScrollingModule,
    GoogleMapsModule,
    MatProgressBarModule,
    ShareIconsModule,
    MatTabsModule,
    IvyCarouselModule,
    MatRadioModule,
    FormsModule,
    MatStepperModule,
    MatExpansionModule,
    MatNativeDateModule,
    BusinessPublicModule,

    //BlogModule,
    AuthenticationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MakeGiftComponent,
    GalleryManagerPublicComponent,
    ToolsPublicComponent
  ]
})
export class PublicModule {

}
