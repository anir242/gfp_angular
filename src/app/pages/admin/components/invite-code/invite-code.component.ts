import {Component, Input, OnInit} from '@angular/core';
import { BaseComponent } from '../../../_base/base/base.component';
import { Response } from "../../../../_models/api/response";
import { InviteCodeInterface } from '../../../../_models/api/invite-codes/invite-code-interface'
import { InviteCodeService } from '../../../../_services/invite-codes/invite-code.service'

@Component({
  selector: 'app-invite-code',
  templateUrl: './invite-code.component.html',
  styleUrls: ['./invite-code.component.scss']
})
export class InviteCodeComponent extends BaseComponent implements OnInit {
  inviteCodes: InviteCodeInterface[];
  inviteCode: InviteCodeInterface;
  hovering: boolean;
  copied: boolean;
  copyError: boolean;
  field: any;

  constructor(
    private inviteCodeService: InviteCodeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadInviteCodes().then();
    this.field = document.getElementById('inviteCode');
  }

  loadInviteCodes = async () => {
    try {
      const response: Response<InviteCodeInterface[]> = await this.inviteCodeService.getMyInviteCodes();
      if (response?.success) {
        this.inviteCodes = response.data;
        if (this.inviteCodes.length > 0) {
          this.inviteCode = this.inviteCodes[0];
        }
      } else {
        this.showErrorResponse(response)
      }
    } catch (e) {
      this.showErrorResponse(e)
    }
  }

  renew = async () => {
    try {
      const response: Response<InviteCodeInterface[]> = await this.inviteCodeService.renewInviteCode({
        userId: localStorage.getItem('id')
      });
      if (response?.success) {
        this.inviteCodes = response.data;
        this.ngOnInit()
      } else {
        this.showErrorResponse(response)
      }
    } catch (e) {
      this.showErrorResponse(e)
    }
  }

  copy(): void {
    if (this.inviteCode) {
      const message = this.translate.instant('projectDetails.inviteAFriendCopy', { value: this.inviteCode.token });
      navigator.clipboard.writeText(message);
      this.copied = true;
      this.field.classList.add('success')
    } else {
      this.copyError = true;
      this.field.classList.add('error')
    }
    setTimeout(() => {
      this.copied = false;
      this.copyError = false;
      this.field.classList.remove('success');
      this.field.classList.remove('error');
    }, 3000);
  }

  hover(): void {
    this.hovering = true;
  }

  leave(): void {
    this.hovering = false;
  }

}
