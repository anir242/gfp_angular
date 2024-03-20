import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPublicComponent} from './pages/landing-public/landing-public.component';
import {WelcomeOnBoardComponent} from './pages/welcome-on-board/welcome-on-board.component';
import {LegalStuffComponent} from './pages/legal-stuff/legal-stuff.component';
import {TermsConditionsComponent} from './pages/legal-stuff/terms-conditions/terms-conditions.component';
import {PrivacyPolicyComponent} from './pages/legal-stuff/privacy-policy/privacy-policy.component';
import {CookiePolicyComponent} from './pages/legal-stuff/cookie-policy/cookie-policy.component';
import {LegalStuff} from '../../_models/components/legal-stuff';
import {FaqComponent} from './pages/faq/faq.component';
import { CarbonDioxideOffsetComponent } from 'src/app/pages/public/components/carbon-dioxide-offset/carbon-dioxide-offset.component';
import { PartnersPublicComponent } from 'src/app/pages/public/pages/partners-public/partners-public.component';
import { EcommApiPublicComponent } from './pages/ecomm-api-public/ecomm-api-public.component';
import { ClimatePositiveSubscriptionComponent } from './pages/climate-positive-subscription/climate-positive-subscription.component';
// import { MonthlyClimateSubscriptionComponent } from './pages/monthly-climate-subscription/monthly-climate-subscription.component';
import { GreenNftComponent } from './pages/green-nft/green-nft.component';
import {SingleDonationsComponent} from './pages/single-donations/single-donations.component';
import { NativaLandingComponent } from './pages/nativa-landing/nativa-landing.component';
import { CarbonNeutralSolutionsComponent } from './pages/carbon-neutral-solutions/carbon-neutral-solutions.component';
import { CarbonFootprintManagementComponent } from './pages/carbon-footprint-management/carbon-footprint-management.component';
import { EnvironmentalSustainabilityAdvisoryComponent } from './pages/environmental-sustainability-advisory/environmental-sustainability-advisory.component';
import { NativaWelcomeComponent } from './pages/nativa-welcome/nativa-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPublicComponent
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects-public/projects-public.module').then(m => m.ProjectsPublicModule),
    data: {
      breadcrumb: 'breadcrumb.projects'
    }
  },
  {
    path: 'welcomeOnBoard',
    component: WelcomeOnBoardComponent,
    title: 'GFP | Welcome on Board!'
  },
  {
    path: 'gift',
    loadChildren: () => import('./pages/gift-public/gift.module').then(m => m.GiftModule),
    data: {
      breadcrumb: 'breadcrumb.gift'
    },
    title: 'GFP | Gifting'
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about-public/about-public.module').then(m => m.AboutPublicModule),
    data: {
      breadcrumb: 'breadcrumb.about'
    },
    title: 'GFP | About'
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./pages/subscriptions-public/subscriptions-public.module').then(m => m.SubscriptionsPublicModule),
    data: {
      breadcrumb: 'breadcrumb.subscriptions'
    },
    title: 'GFP | Subscriptions'
  },
  {
    path: 'business',
    loadChildren: () => import('./pages/business-public/business-public.module').then(m => m.BusinessPublicModule),
    data: {
      breadcrumb: 'breadcrumb.business'
    },
    title: 'GFP | Business'
  },
  {
    path: 'company',
    loadChildren: () => import('./pages/company-public/company-public.module').then(m => m.CompanyPublicModule),
    data: {
      breadcrumb: 'breadcrumb.company'
    },
    title: 'GFP | Company'
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule),
    data: {
      breadcrumb: 'breadcrumb.blog'
    },
    title: 'GFP | Blog'
  },
  {
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
    title: 'GFP | Privacy Policy'
  },
  {
    path: 'termsConditions',
    component:TermsConditionsComponent,
    title: 'GFP | Terms & Conditions'
  },
  {
    path: 'cookiePolicy',
    component:CookiePolicyComponent,
    title: 'GFP | Cookie Policy'
  },
  {
    path: 'faq',
    component: FaqComponent,
    title: 'GFP | FAQ'
  },
  {
    path: 'offset',
    component: CarbonDioxideOffsetComponent,
    title: 'CO2 Offset'
  },
  {
    path: 'offset/checkout',
    component: SingleDonationsComponent,
    title: 'CO2 Offset'
  },
  {
    path: 'partners',
    component: PartnersPublicComponent,
    title: 'Our Partners'
  },
  //{
  //  path: 'company',
  //  loadChildren: () => import('./pages/company-public/company-public.module').then(m => m.CompanyPublicModule),
  //  data: {
  //    breadcrumb: 'breadcrumb.company'
  //  }
  //},
  {
    path: 'api',
    component: EcommApiPublicComponent,
    title: 'GFP | Ecomm & API'
  },
  {
    path: 'carbon_neutral_solutions',
    component: CarbonNeutralSolutionsComponent,
    title: 'GFP | Carbon Neutral Solutions'
  },
  {
    path: 'carbon_footprint_management',
    component: CarbonFootprintManagementComponent,
    title: 'GFP | Carbon Footprint Management'
  },
  {
    path: 'environmental_sustainability_advisory',
    component: EnvironmentalSustainabilityAdvisoryComponent,
    title: 'GFP | Environmental Sustainability Advisory'
  },
  {
    path: 'soluzioni_carbon_neutral',
    component: CarbonNeutralSolutionsComponent,
    title: 'GFP | Carbon Neutral Solutions'
  },
  {
    path: 'gestione_impronta_carbonio',
    component: CarbonFootprintManagementComponent,
    title: 'GFP | Carbon Footprint Management'
  },
  {
    path: 'consulenza_sostenibilita_ambientale',
    component: EnvironmentalSustainabilityAdvisoryComponent,
    title: 'GFP | Environmental Sustainability Advisory'
  },
  {
    path: 'climatePositiveSubscription',
    component: ClimatePositiveSubscriptionComponent,
    title: 'GFP | Climate Positive Subscription'
  },
  {
    path: 'monthlyClimateSubscription',
    // component: MonthlyClimateSubscriptionComponent,
    loadChildren: () => import('./pages/monthly-climate-subscription/monthly-climate-subscription.module').then(m => m.MonthlyClimateSubscriptionModule),
    title: 'GFP | Montly Climate Subscription'
  },
  {
    path: 'nft',
    component: GreenNftComponent,
    title: 'GFP | Green NFT'
  },
  {
    path: 'nativa',
    component: NativaLandingComponent,
    title: 'GFP | Nativa'
  },
  { path: 'nativa/welcome', 
    component: NativaWelcomeComponent,
    title: 'GFP | Nativa Welcome'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
