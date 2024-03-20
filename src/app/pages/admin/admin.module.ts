import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {AdminRoutingModule} from './admin-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import { SharedModule } from '../../_modules/shared/shared.module';
import { PublicSharedModule } from '../public/modules/public-shared/public-shared.module';
import { CompanyPublicModule } from '../public/pages/company-public/company-public.module';
import { InfoComponent } from '../../components/info/info.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DashboardStatisticComponent } from './components/dashboard/statistics/statistic.component';
import { InviteCodeComponent } from './components/invite-code/invite-code.component';
import {YourImpactComponent} from './components/your-impact/your-impact.component';
import {PreservationFirstStageComponent} from './components/stages/preservation-first-stage/preservation-first-stage.component';
import {ReforestationFirstStageComponent} from './components/stages/reforestation-first-stage/reforestation-first-stage.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {AboutManagerComponent} from './components/about-manager/about-manager.component';
import {GalleryManagerComponent} from './components/gallery/gallery-manager/gallery-manager.component';
import {RenewableFirstStageComponent} from './components/stages/renewable-first-stage/renewable-first-stage.component';
import {RatingComponent} from '../../components/rating/rating.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTabsModule } from '@angular/material/tabs';
import {YourImpactStagesComponent} from './components/your-impact-stages/your-impact-stages.component';
import {HeaderStagesComponent} from './components/stages/header-stages/header-stages.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProjectDataComponent } from './components/project-data/project-data.component';
import {MarineFirstStageComponent} from './components/stages/marine-first-stage/marine-first-stage.component';
import {PreservationSecondStageComponent} from './components/stages/preservation-second-stage/preservation-second-stage.component';
import {RenewableSecondStageComponent} from './components/stages/renewable-second-stage/renewable-second-stage.component';
import {ReforestationSecondStageComponent} from './components/stages/reforestation-second-stage/reforestation-second-stage.component';
import {ReforestationThirdStageComponent} from './components/stages/reforestation-third-stage/reforestation-third-stage.component';
import {InactiveComponent} from './components/stages/inactive/inactive.component';
import {StagesComponent} from './components/stages/stages.component';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {DownloadReportComponent} from './components/download-report/download-report.component';
import {ReforestationFourthStageComponent} from './components/stages/reforestation-fourth-stage/reforestation-fourth-stage.component';
import {PreservationFourthStageComponent} from './components/stages/preservation-fourth-stage/preservation-fourth-stage.component';
import { MarineSecondStageComponent } from './components/stages/marine-second-stage/marine-second-stage.component';
import { MarineThirdStageComponent } from './components/stages/marine-third-stage/marine-third-stage.component';
import { MarineFourthStageComponent } from './components/stages/marine-fourth-stage/marine-fourth-stage.component';
import { AddSalesComponent } from './components/add-sales/add-sales.component'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImpactCardComponent } from './components/impact-card/impact-card.component';
import { ApiWidgetComponent } from './pages/api-widget/api-widget.component';


@NgModule({
  declarations: [
    LandingComponent,
    DashboardComponent,
    ProjectListComponent,
    DashboardStatisticComponent,
    InviteCodeComponent,
    YourImpactComponent,
    PreservationFirstStageComponent,
    ReforestationFirstStageComponent,
    AboutManagerComponent,
    GalleryManagerComponent,
    RenewableFirstStageComponent,
    YourImpactStagesComponent,
    HeaderStagesComponent,
    ProjectDataComponent,
    MarineFirstStageComponent,
    PreservationSecondStageComponent,
    RenewableSecondStageComponent,
    ReforestationSecondStageComponent,
    ReforestationThirdStageComponent,
    InactiveComponent,
    StagesComponent,
    DownloadReportComponent,
    ReforestationFourthStageComponent,
    PreservationFourthStageComponent,
    MarineSecondStageComponent,
    MarineThirdStageComponent,
    MarineFourthStageComponent,
    AddSalesComponent,
    ImpactCardComponent,
    ApiWidgetComponent
  ],
  imports: [
    AdminRoutingModule,
    TranslateModule,
    SharedModule,
    PublicSharedModule,
    NgxChartsModule,
    MatGridListModule,
    ScrollingModule,
    GoogleMapsModule,
    MatProgressBarModule,
    ShareIconsModule,
    MatTooltipModule,
    MatTabsModule
    //CompanyPublicModule
  ],
  exports: [
    PreservationFirstStageComponent,
    ReforestationFirstStageComponent,
    AboutManagerComponent,
    GalleryManagerComponent,
    RenewableFirstStageComponent,
    RatingComponent,
    ProjectDataComponent,
    ProjectListComponent,
    DashboardStatisticComponent,
    InviteCodeComponent,
    YourImpactComponent,
    PreservationFirstStageComponent,
    ReforestationFirstStageComponent,
    RenewableFirstStageComponent,
    YourImpactStagesComponent,
    MarineFirstStageComponent,
    PreservationSecondStageComponent,
    RenewableSecondStageComponent,
    ReforestationSecondStageComponent,
    ReforestationThirdStageComponent,
    InactiveComponent,
    StagesComponent,
    DownloadReportComponent,
    ReforestationFourthStageComponent,
    PreservationFourthStageComponent,
    MarineSecondStageComponent,
    MarineThirdStageComponent,
    MarineFourthStageComponent,
    AddSalesComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AdminModule {
}
