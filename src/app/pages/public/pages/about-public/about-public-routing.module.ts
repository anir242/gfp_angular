import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WhatWeDoComponent} from './pages/what-we-do/what-we-do.component';
import {ProjectTypologyComponent} from './pages/project-typology/project-typology.component';
import {AchievementsComponent} from './pages/achievements/achievements.component';
import {TeamComponent} from './pages/team/team.component';
import {ProjectTypeResolver} from '../../../../_services/resolver/project-type.resolver';
import { AboutComponent } from 'src/app/pages/public/pages/about-public/pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    title: 'About GFP'
  },
  {
    path: 'whatWeDo',
    component: WhatWeDoComponent,
    data: {
      breadcrumb: 'breadcrumb.whatWeDo'
    },
    title: 'GFP | What We Do'
  },
  {
    path: 'achievements',
    component: AchievementsComponent,
    data: {
      breadcrumb: 'breadcrumb.achievements'
    },
    title: 'GFP | Achievements'
  },
  {
    path: 'team',
    component: TeamComponent,
    data: {
      breadcrumb: 'breadcrumb.team'
    },
    title: 'GFP | Team'
  },
  {
    path: ':slug',
    component: ProjectTypologyComponent,
    data: {
      breadcrumb: (data) => {
        return `${data.projectType}`;
      }
    },
    title: 'GFP | Projects',
    resolve: {
      projectType: ProjectTypeResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutPublicRoutingModule { }
