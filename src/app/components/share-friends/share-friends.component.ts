import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {MatChipList} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {EmailItem} from '../../_models/components/email-item';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {InvitationsService} from '../../_services/invitations/invitations.service';
import {Response} from '../../_models/api/response';
import {ProgressTypes} from '../../_models/components/progress-types';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-share-friends',
  templateUrl: './share-friends.component.html',
  styleUrls: ['./share-friends.component.scss']
})
export class ShareFriendsComponent extends BaseComponent implements OnInit {
  items = [
    {text: this.translate.instant('newShareFriends.invite')},
    {text: this.translate.instant('newShareFriends.click')},
    {text: this.translate.instant('newShareFriends.trees')},
  ];
  progressTypes = ProgressTypes;
  @ViewChild('chipList') chipList: MatChipList;
  shared = false;
  removable = true;
  buttonDisabled = true;
  userType = 'users';
  separatorKeys = [ENTER, COMMA];
  emailList: EmailItem[] = [];
  emails = [];
  placeholderValue = this.translate.instant('share.writeOrCopy');
  formEmails: UntypedFormGroup;
  form: UntypedFormBuilder = new UntypedFormBuilder();
  invitationsInterface = false;

  constructor(
    private dialogRef: MatDialogRef<ShareFriendsComponent>,
    private invitationsService: InvitationsService,
  ) {
    super();
  }

  add(event): void {
    if (event.value) {
      if (event.value.length <= 20000) {
        this.emailList.push({value: event.value, invalid: !this.validateEmail(event.value)});
        this.checkInvite();
      }
    }
    event.chipInput.clear();
    this.chipList.errorState = !this.isAllEmailValid();
    this.placeholderValue = '';
  }

  checkInvite(): void {
    this.buttonDisabled = false;
    this.emailList.forEach(element => {
      if (element.invalid === true) {
        this.buttonDisabled = true;
      }
    });
  }

  removeEmail(data: any): void {
    if (this.emailList.indexOf(data) >= 0) {
      this.emailList.splice(this.emailList.indexOf(data), 1);
      this.checkInvite();
    }
    if (this.emailList.length === 0) {
      this.placeholderValue = this.translate.instant('share.writeOrCopy');
      this.buttonDisabled = true;
    }
    this.chipList.errorState = !this.isAllEmailValid();
  }

  ngOnInit(): void {
    this.formEmails = this.form.group({
      emailList: this.form.array([], [this.validateArray])
    });
  }

  validateArray(c: UntypedFormControl): any {
    if (c.value && c.value.length === 0) {
      return {
        validateArray: {valid: false}
      };
    }
    return null;
  }

  invite = async () => {
    let i = 0;
    this.emailList.forEach(element => {
      this.emails[i] = element.value;
      i++;
    });
    const params = {
      emails: this.emails,
      type: this.userType
    };
    try {
      const response: Response<boolean> = await this.invitationsService.sendEmployeesList(params);
      this.invitationsInterface = response.success;
      if (response?.success) {
        this.dialogRef.close(true);
        this.showSuccess(
          this.translate.instant('share.friendsInvited'),
          this.translate.instant('success')
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.resetVariables();
  }

  resetVariables(): void {
    this.emailList = null;
    this.emails = null;
  }

  isAllEmailValid(): boolean {
    return this.emailList.filter((item: EmailItem) => {
      return item.invalid;
    }).length === 0;
  }

  goToDashboard = async () => {
    await this.router.navigate(['/']);
  }
}
