import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompanyPublicComponent} from './pages/company-public.component';
import {ProjectDetailComponent} from '../../../admin/pages/projects/project-detail/project-detail.component';
import {ProjectsResolver} from '../../../../_services/resolver/projects.resolver';

const routes: Routes = [
  {
    path: '',
    component: CompanyPublicComponent
  },
  {
    path: ':id',
    component: CompanyPublicComponent,
    data: {
      breadcrumb: (data) => {
        return `${data.companyId}`;
      }
    },
    title: 'GFP | Company Impact',
  },
  {
    path: ':id/:slug',
    component: ProjectDetailComponent,
    data: {
      breadcrumb: (data) => {
        return `${data.companyId}`;
      }
    },
    title: 'GFP | Company Project Impact',
    resolve: {
      projectSlug: ProjectsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPublicRoutingModule { }
