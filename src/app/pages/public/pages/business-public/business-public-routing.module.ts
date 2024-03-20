import {ProjectTypeResolver} from '../../../../_services/resolver/project-type.resolver';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WhatWeDoComponent} from '../about-public/pages/what-we-do/what-we-do.component';
import {WhyJoinComponent} from './pages/why-join/why-join.component';
import {ApiIntegrationComponent} from './pages/api-integration/api-integration.component';

const routes: Routes = [
  {
    path: 'whyJoin',
    component: WhyJoinComponent,
    data: {
      breadcrumb: 'breadcrumb.whyJoin'
    },
    title: 'GFP | Why Join'
  },
  {
    path: 'apiIntegration',
    component: ApiIntegrationComponent,
    data: {
      breadcrumb: 'breadcrumb.apiIntegration'
    },
    title: 'GFP | API Integrations'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessPublicRoutingModule { }
