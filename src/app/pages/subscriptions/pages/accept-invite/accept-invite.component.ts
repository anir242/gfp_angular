import {Component, OnInit, ViewChild} from '@angular/core';
import {InvitationsInterface} from '../../../../_models/api/invitations/invitations-interface';
import {InvitationsService} from '../../../../_services/invitations/invitations.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {Response} from '../../../../_models/api/response';
import {ActivatedRoute} from '@angular/router';
import {ErrorCodes} from '../../../../_models/components/error-codes';
import {AuthService} from '../../../../_services/_base/auth.service';

@Component({
  selector: 'app-accept-invite',
  template: ''
})
export class AcceptInviteComponent extends BaseComponent implements OnInit {
  invitationsInterface: boolean;
  constructor(
    private route: ActivatedRoute,
    private invitationsService: InvitationsService,
    public auth: AuthService
  ) {
    super();
  }
  ngOnInit(): void {
     this.acceptInvite().then();
  }
  acceptInvite = async () => {
    const params = {
      token: this.route.snapshot.params.token,
    };
    let path = '/';
    try {
      const response: Response<boolean> = await this.invitationsService.acceptInvitation(params);
      if (response?.success) {
        if (!this.auth.isAuthenticated()) {
          path = '/login';
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      if (e?.code === ErrorCodes.USER_NOT_FOUND) {
        path = '/register';
      }else{
        this.showErrorResponse(e);
      }
    }
    await this.router.navigate([path], {queryParams: {invited: true}});
  }
}
