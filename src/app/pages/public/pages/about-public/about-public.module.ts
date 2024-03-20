import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhatWeDoComponent} from './pages/what-we-do/what-we-do.component';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {AboutPublicRoutingModule} from './about-public-routing.module';
import {AboutTitlePublicComponent} from '../../components/about-title-public/about-title-public.component';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {ProjectTypologyComponent} from './pages/project-typology/project-typology.component';
import {AchievementsComponent} from './pages/achievements/achievements.component';
import {TeamComponent} from './pages/team/team.component';
import {OurTeamComponent} from '../../components/our-team/our-team.component';
import {ShapeFutureComponent} from '../../components/shape-future/shape-future.component';
import { DoneSoFarComponent } from '../../components/done-so-far/done-so-far.component';
import { CalendlyPopupComponent } from '../../components/calendly-popup/calendly-popup.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
    declarations: [
        CalendlyPopupComponent,
        WhatWeDoComponent,
        ProjectTypologyComponent,
        AchievementsComponent,
        ShapeFutureComponent,
        DoneSoFarComponent,
        TeamComponent,
        OurTeamComponent,
        AboutComponent,
    ],
    imports: [
        CommonModule,
        AboutPublicRoutingModule,
        SharedModule,
        PublicSharedModule,
        ScrollingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPublicModule {
}
