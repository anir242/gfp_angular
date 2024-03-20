import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthGuardService as AuthGuard} from './_services/_base/auth-guard.service';
import {ShopifyConnectionComponent} from './pages/callback/shopify-connection/shopify-connection.component';
import {UserLayoutComponent} from './layouts/user-layout/user-layout.component';
import {PublicLayoutComponent} from './layouts/public-layout/public-layout.component';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';

const routes: Routes = [

  {
    path: '',
    component: PublicLayoutComponent,
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./pages/authentications/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'admin/users',
    component: UserLayoutComponent,
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopify/connection',
    component: ShopifyConnectionComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    loadChildren: () => import('./pages/callback/invitation-routing/invitation.module').then(m => m.InvitationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

