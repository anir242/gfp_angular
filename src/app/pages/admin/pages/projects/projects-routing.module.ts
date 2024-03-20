import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {ProjectsComponent} from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    title: 'GFP | Projects'
  },
  {
    path: ':slug',
    component: ProjectDetailComponent,
    title: 'GFP | Project Impact'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
