import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {ProjectsRoutingModule} from './projects-routing.module';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {AdminModule} from '../../admin.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {ProjectsComponent} from './projects/projects.component';


@NgModule({
  declarations: [ProjectDetailComponent, ProjectsComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    AdminModule,
    MatProgressBarModule,
    MatTabsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsModule {
}
