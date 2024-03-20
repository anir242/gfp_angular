import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {UserLayoutComponent} from '../../layouts/user-layout/user-layout.component';
import { ApiWidgetComponent } from './pages/api-widget/api-widget.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'GFP | Portal'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'GFP | Dashboard'
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule),
    title: 'GFP | Projects'
  },
  {
    path: 'users',
    component: UserLayoutComponent,
    loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
    title: 'GFP | Users'
  },
  {
    path: 'widget',
    component: ApiWidgetComponent,
    title: 'GFP | API Widget'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
