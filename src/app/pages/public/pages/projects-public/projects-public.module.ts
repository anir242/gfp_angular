import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectsPublicRoutingModule} from './projects-public-routing.module';
import {ProjectPublicDetailsComponent} from './pages/project-public-details/project-public-details.component';
import {ProjectsPublicComponent} from './pages/projects-public/projects-public.component';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {GoogleMapsModule} from '@angular/google-maps';
import {ProjectListItemComponent} from './components/project-list-item/project-list-item.component';
import {
  ProjectDetailsCharacteristicsComponent
} from '../../components/project-details-characteristics/project-details-characteristics.component';
import {ProjectDetailsSummaryComponent} from '../../components/project-details-summary/project-details-summary.component';
import {ProjectDetailsSliderComponent} from '../../components/project-details-slider/project-details-slider.component';
import {ProjectDetailsTitleComponent} from '../../components/project-details-title/project-details-title.component';
import { ProjectLiveComponent } from '../../../public/pages/projects-public/pages/project-live/project-live.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { SafePipe } from '../../../../pipes/safe.pipe'


@NgModule({
  declarations: [
    ProjectPublicDetailsComponent,
    ProjectsPublicComponent,
    ProjectListItemComponent,
    ProjectDetailsTitleComponent,
    ProjectDetailsCharacteristicsComponent,
    ProjectDetailsSummaryComponent,
    ProjectDetailsSliderComponent,
    ProjectLiveComponent,
    SafePipe
  ],
    imports: [
        CommonModule,
        ProjectsPublicRoutingModule,
        SharedModule,
        PublicSharedModule,
        GoogleMapsModule,
        MatButtonToggleModule,
        MatExpansionModule,
        ScrollingModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsPublicModule {
}
