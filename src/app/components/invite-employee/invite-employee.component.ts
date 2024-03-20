import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProgressTypes} from '../../_models/components/progress-types';
import {MatChipList} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {EmailItem} from '../../_models/components/email-item';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InvitationsService} from '../../_services/invitations/invitations.service';
import {Response} from '../../_models/api/response';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {CompanyEmployeesInterface} from '../../_models/api/companies/company-employees-interface';
import {SubscriptionTypes} from '../../_models/components/subscription-types';
import {CompanyEmployeesService} from '../../_services/companies/company-employees.service';
import {StorageName} from '../../_models/components/storage-name';
import {needsLinking} from '@angular/compiler-cli/linker';

@Component({
  selector: 'app-invite-employee',
  templateUrl: './invite-employee.component.html',
  styleUrls: ['./invite-employee.component.scss']
})
export class InviteEmployeeComponent extends BaseComponent implements OnInit {
  progressTypes = ProgressTypes;
  @ViewChild('chipListGlobe') chipListGlobe: MatChipList;
  @ViewChild('chipListFlyers') chipListFlyers: MatChipList;
  @ViewChild('chipListEco') chipListEco: MatChipList;
  placeholderGlobe = this.translate.instant('share.writeOrCopy');
  placeholderFlyers = this.translate.instant('share.writeOrCopy');
  placeholderEco = this.translate.instant('share.writeOrCopy');
  shared = false;
  removable = true;
  buttonDisabled = true;
  userType = 'users';
  separatorKeys = [ENTER, COMMA];
  emailList: EmailItem[] = [];
  emails = [];
  formEmails: UntypedFormGroup;
  form: UntypedFormBuilder = new UntypedFormBuilder();
  globeTrotter: any = [];
  frequentFlyer: any = [];
  ecoFriendly: any = [];
  remainingTrotter = 0;
  remainingFlyers = 0;
  remainingFriendly = 0;
  subscriptionTypes = SubscriptionTypes;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CompanyEmployeesInterface[],
    private invitationsService: InvitationsService,
    private companyEmployeesService: CompanyEmployeesService,
    private dialogRef: MatDialogRef<InviteEmployeeComponent>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.data = this.data.filter(x => x.subscriptionType.id !== null);
    this.groupBySubscription();
  }

  groupBySubscription(): void {
    this.data.forEach(item => {
        if (item.subscriptionType.slug === SubscriptionTypes.frequentFlyer) {
          if (item.status === 'empty') {
            this.remainingFlyers++;
          } else if (item.status !== 'pending'){
            this.frequentFlyer.push({value: item.user.email ? item.user.email : item?.email, invalid: false});
          }
        } else if (item.subscriptionType.slug === SubscriptionTypes.globeTrotter) {
          if (item.status === 'empty') {
            this.remainingTrotter++;
          } else if (item.status !== 'pending'){
            this.globeTrotter.push({value: item.user.email ? item.user.email : item?.email, invalid: false});
          }
        } else if (item.subscriptionType.slug === SubscriptionTypes.ecoFriendly) {
          if (item.status === 'empty') {
            this.remainingFriendly++;
          } else if (item.status !== 'pending'){
            this.ecoFriendly.push({value: item.user.email ? item.user.email : item?.email, invalid: false});
          }
        }
      }
    );
    this.formEmails = this.form.group({
      frequentFlyer: this.form.array([this.frequentFlyer], [this.validateArray]),
      ecoFriendly: this.form.array([this.ecoFriendly], [this.validateArray]),
      globeTrotter: this.form.array([this.globeTrotter], [this.validateArray])
    });
  }

  add(event, subscriptionType: string): void {
    if (event.value) {
      if (event.value.length <= 20000) {
        switch (subscriptionType) {
          case SubscriptionTypes.frequentFlyer:
            this.frequentFlyer.push({value: event.value, invalid: !this.validateEmail(event.value)});
            event.chipInput.clear();
            this.chipListFlyers.errorState = !this.isEmailValid(subscriptionType);
            this.placeholderFlyers = '';
            this.remainingFlyers--;
            break;
          case SubscriptionTypes.ecoFriendly:
            this.ecoFriendly.push({value: event.value, invalid: !this.validateEmail(event.value)});
            event.chipInput.clear();
            this.chipListEco.errorState = !this.isEmailValid(subscriptionType);
            this.placeholderEco = '';
            this.remainingFriendly--;
            break;
          case SubscriptionTypes.globeTrotter:
            this.globeTrotter.push({value: event.value, invalid: !this.validateEmail(event.value)});
            event.chipInput.clear();
            this.chipListGlobe.errorState = !this.isEmailValid(subscriptionType);
            this.placeholderGlobe = '';
            this.remainingTrotter--;
            break;
        }
        this.checkInvite();
      }
    }
  }

  checkInvite(): void {
    this.buttonDisabled = !this.isAllEmailValid();
    /*    this.emailList.forEach(element => {
          if (element.invalid === true) {
            this.buttonDisabled = true;
          }
        });*/
  }

  removeEmail(data: any, subscriptionType: string): void {
    switch (subscriptionType) {
      case SubscriptionTypes.frequentFlyer:
        if (this.frequentFlyer.indexOf(data) >= 0) {
          this.frequentFlyer.splice(this.frequentFlyer.indexOf(data), 1);
          this.checkInvite();
          this.remainingFlyers++;
        }
        if (this.frequentFlyer.length === 0) {
          this.placeholderFlyers = this.translate.instant('share.writeOrCopy');
          this.buttonDisabled = false;
        }
        this.chipListFlyers.errorState = !this.isEmailValid(subscriptionType)
        break;
      case SubscriptionTypes.ecoFriendly:
        if (this.ecoFriendly.indexOf(data) >= 0) {
          this.ecoFriendly.splice(this.ecoFriendly.indexOf(data), 1);
          this.checkInvite();
          this.remainingFriendly++;
        }
        if (this.ecoFriendly.length === 0) {
          this.placeholderEco = this.translate.instant('share.writeOrCopy');
          this.buttonDisabled = false;
        }
        this.chipListEco.errorState = !this.isEmailValid(subscriptionType);
        break;
      case SubscriptionTypes.globeTrotter:
        if (this.globeTrotter.indexOf(data) >= 0) {
          this.globeTrotter.splice(this.globeTrotter.indexOf(data), 1);
          this.checkInvite();
          this.remainingTrotter++;
        }
        if (this.globeTrotter.length === 0) {
          this.placeholderGlobe = this.translate.instant('share.writeOrCopy');
          this.buttonDisabled = false;
        }
        this.chipListGlobe.errorState = !this.isEmailValid(subscriptionType);
        break;
    }
    this.isAllEmailValid() === true ? this.buttonDisabled = false : this.buttonDisabled = true;
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
    const params = [
      {
        slug: SubscriptionTypes.globeTrotter,
        emails: this.globeTrotter.map(item => item.value)
      },
      {
        slug: SubscriptionTypes.ecoFriendly,
        emails: this.ecoFriendly.map(item => item.value)
      },
      {
        slug: SubscriptionTypes.frequentFlyer,
        emails: this.frequentFlyer.map(item => item.value)
      }];
    const companyId = localStorage.getItem(StorageName.companyId);
    try {
      const response: Response<any> = await this.companyEmployeesService.updateCompanyEmployeesById(companyId, params);
      if (response?.success) {
        if (response.data === true) {
          this.dialogRef.close(true);
          this.showSuccess(
            this.translate.instant('share.friendsInvited'),
            this.translate.instant('success')
          );
        }
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
    const x = this.globeTrotter.filter((item: EmailItem) => {
      return item.invalid;
    }).length === 0;
    const y = this.ecoFriendly.filter((item: EmailItem) => {
      return item.invalid;
    }).length === 0;
    const z = this.frequentFlyer.filter((item: EmailItem) => {
      return item.invalid;
    }).length === 0;
    return x && y && z;
  }

  isEmailValid(subscriptionType: string): boolean {
    switch (subscriptionType) {
      case SubscriptionTypes.ecoFriendly:
        return this.ecoFriendly.filter((item: EmailItem) => {
          return item.invalid;
        }).length === 0;
      case SubscriptionTypes.globeTrotter:
        return this.globeTrotter.filter((item: EmailItem) => {
          return item.invalid;
        }).length === 0;
      case SubscriptionTypes.frequentFlyer:
        return this.frequentFlyer.filter((item: EmailItem) => {
          return item.invalid;
        }).length === 0;
    }
  }

  goToDashboard = async () => {
    await this.router.navigate(['/']);
  }
}
