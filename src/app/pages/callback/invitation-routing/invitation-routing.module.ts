import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AcceptInviteComponent} from '../../subscriptions/pages/accept-invite/accept-invite.component';

const routes: Routes = [
  {
    path: 'acceptInvite/:token',
    component: AcceptInviteComponent,
    title: 'GFP | Accept Invite'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitationRoutingModule {
}
