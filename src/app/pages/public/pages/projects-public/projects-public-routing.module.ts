import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectPublicDetailsComponent} from './pages/project-public-details/project-public-details.component';
import {ProjectsPublicComponent} from './pages/projects-public/projects-public.component';
import {ProjectTypeResolver} from '../../../../_services/resolver/project-type.resolver';
import { ProjectLiveComponent } from './pages/project-live/project-live.component';
import {SingleDonationsComponent} from '../single-donations/single-donations.component';
import { ProjectsResolver } from '../../../../_services/resolver/projects.resolver';
import { GalleryManagerPublicComponent } from '../../components/gallery/gallery-manager/gallery-manager.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPublicComponent,
    title: 'GFP | Projects'
  },
  {
    path: ':slug',
    component: ProjectPublicDetailsComponent,
    data: {
      breadcrumb: (data) => {
        return `${data.projectSlug}`;
      }
    },
    title: 'GFP | Project Details',
    resolve: {
      projectSlug: ProjectsResolver
    }
  },
  {
    path: ':slug/singleDonations',
    component: SingleDonationsComponent,
    title: 'GFP | Project Donations'
  },
  {
    path: ':slug/gallery',
    component: GalleryManagerPublicComponent,
    title: 'GFP | Project Gallery'
  },
  {
    path: ':slug/live',
    component: ProjectLiveComponent,
    title: 'GFP | Live Experience'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsPublicRoutingModule { }
