import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SupportingCardsComponent } from '../../components/supporting-cards/supporting-cards.component';
import { PressComponent } from '../../components/press/press.component';
import {ItemsListComponent} from '../../components/items-list/items-list.component';
import {SolutionComponent} from '../../components/solution/solution.component';
import {ApproachComponent} from '../../components/approach/approach.component';
import {ManifestoComponent} from '../../components/manifesto/manifesto.component';
import {ImpactExplainedComponent} from '../../components/impact-explained/impact-explained.component';
import {TranslateModule} from '@ngx-translate/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {SubscribeComponent} from '../../components/subscribe/subscribe.component';
import {ProjectTitlePublicComponent} from '../../components/project-title-public/project-title-public.component';
import {ProjectAboutDataComponent} from '../../components/project-about-data/project-about-data.component';
import {AboutProblemComponent} from '../../components/about-problem/about-problem.component';
import {TitlePublicComponent} from '../../components/title-public/title-public.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {SquaredInfoDataComponent} from '../../components/squared-info-data/squared-info-data.component';
import {ArrowScrollComponent} from '../../components/arrow-scroll/arrow-scroll.component';
import {GiftCardComponent} from '../../pages/gift-public/components/gift-card/gift-card.component';
import {TitleImagesComponent} from '../../components/title-images/title-images.component';
import {CardIconTextComponent} from '../../components/card-icon-text/card-icon-text.component';
import {IconTextComponent} from '../../components/icon-text/icon-text.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {SingleDonationPriceComponent} from '../../components/single-donation-price/single-donation-price.component';
import {TickAndTextComponent} from '../../../../components/tick-and-text/tick-and-text.component';
import {JoinGfpFormComponent} from '../../components/join-gfp-form/join-gfp-form.component';
import {AboutTitlePublicComponent} from '../../components/about-title-public/about-title-public.component';
import {CardIconSmallComponent} from '../../pages/business-public/components/card-icon-small/card-icon-small.component';
import {SummaryWelcomeOnBoardComponent} from '../../pages/gift-public/components/summary-welcome-on-board/summary-welcome-on-board.component';
import {GiftCardSummaryComponent} from '../../pages/gift-public/components/gift-card-summary/gift-card-summary.component';
import {GiftCartSummaryDataComponent} from '../../pages/gift-public/components/gift-cart-summary-data/gift-cart-summary-data.component';
import {CountersComponent} from '../../../../components/counters/counters.component';
import {SubscriptionCardComponent} from '../../pages/business-public/components/subscription-card/subscription-card.component';
import {YourDataSummaryComponent} from '../../pages/gift-public/components/your-data-summary/your-data-summary.component';
import {JoinGfpComponent} from '../../components/join-gfp/join-gfp.component';
import {RouterModule} from '@angular/router';
import { TitlePublicLogoComponent } from 'src/app/pages/public/components/title-public-logo/title-public-logo.component';
import { NgxMarqueeModule } from 'ngx-marquee';
import { ShortBannerComponent } from '../../components/short-banner/short-banner.component';
import { GroupedCardContentComponent } from '../../components/grouped-card-content/grouped-card-content.component';
import { LayerHeaderCardComponent } from '../../components/layer-header-card/layer-header-card.component';
import { ContactFormComponent } from 'src/app/pages/public/components/contact-form/contact-form.component';
import { GreenNftComponent } from 'src/app/pages/public/pages/green-nft/green-nft.component';
import { FaqPublicComponent } from 'src/app/pages/public/components/faq-public/faq-public.component';
import { ClimatePositiveCardsComponent } from 'src/app/pages/public/components/climate-positive-cards/climate-positive-cards.component';
import {OurAmbassadorsComponent} from 'src/app/pages/public/components/our-ambassadors/our-ambassadors.component';
import {AboutContributeComponent} from '../../components/about-contribute/about-contribute.component';

@NgModule({
  declarations: [
    GiftCartSummaryDataComponent,
    GiftCardSummaryComponent,
    SupportingCardsComponent,
    PressComponent,
    ItemsListComponent,
    IconTextComponent,
    SolutionComponent,
    ApproachComponent,
    ManifestoComponent,
    ImpactExplainedComponent,
    CardIconTextComponent,
    SubscribeComponent,
    ProjectTitlePublicComponent,
    ProjectAboutDataComponent,
    TitleImagesComponent,
    AboutProblemComponent,
    TitlePublicComponent,
    TitlePublicLogoComponent,
    SquaredInfoDataComponent,
    ArrowScrollComponent,
    GiftCardComponent,
    FilterComponent,
    SingleDonationPriceComponent,
    TickAndTextComponent,
    JoinGfpFormComponent,
    AboutTitlePublicComponent,
    CardIconSmallComponent,
    SummaryWelcomeOnBoardComponent,
    CountersComponent,
    SubscriptionCardComponent,
    SummaryWelcomeOnBoardComponent,
    YourDataSummaryComponent,
    JoinGfpComponent,
    ShortBannerComponent,
    GroupedCardContentComponent,
    LayerHeaderCardComponent,
    ContactFormComponent,
    GreenNftComponent,
    FaqPublicComponent,
    ClimatePositiveCardsComponent,
    OurAmbassadorsComponent,
    AboutContributeComponent
  ],
  imports: [
    CommonModule,
        TranslateModule,
        ScrollingModule,
        IvyCarouselModule,
        SharedModule,
        MatExpansionModule,
        MatGridListModule,
        RouterModule,
        NgxMarqueeModule,
    ],
  exports: [
    GiftCartSummaryDataComponent,
    GiftCardSummaryComponent,
    SummaryWelcomeOnBoardComponent,
    PressComponent,
    SupportingCardsComponent,
    ItemsListComponent,
    SolutionComponent,
    CardIconTextComponent,
    IconTextComponent,
    ApproachComponent,
    ManifestoComponent,
    ImpactExplainedComponent,
    TitleImagesComponent,
    ProjectTitlePublicComponent,
    SubscribeComponent,
    ProjectAboutDataComponent,
    AboutProblemComponent,
    TitlePublicComponent,
    SquaredInfoDataComponent,
    ArrowScrollComponent,
    GiftCardComponent,
    IvyCarouselModule,
    FilterComponent,
    SingleDonationPriceComponent,
    TickAndTextComponent,
    JoinGfpFormComponent,
    AboutTitlePublicComponent,
    CardIconSmallComponent,
    CountersComponent,
    SubscriptionCardComponent,
    YourDataSummaryComponent,
    JoinGfpComponent,
    ShortBannerComponent,
    GroupedCardContentComponent,
    LayerHeaderCardComponent,
    ContactFormComponent,
    FaqPublicComponent,
    NgxMarqueeModule,
    ClimatePositiveCardsComponent,
    OurAmbassadorsComponent,
    AboutContributeComponent
  ]
})
export class PublicSharedModule {}
