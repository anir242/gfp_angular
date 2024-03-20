import { Component, OnInit } from '@angular/core';
import { SubscriptionsInterface } from '../../../../_models/api/subscriptions/subscriptions-interface';
import { StorageName } from '../../../../_models/components/storage-name';
import { Response } from '../../../../_models/api/response';
import { UsersInterface } from '../../../../_models/api/users/users-interface';
import { CompanyService } from '../../../../_services/companies/company.service';
import { ModalType } from 'src/app/_models/components/modal-types';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UsersService } from '../../../../_services/users/users.service';
import { RoleTypes } from '../../../../_models/components/role-types';
import { BaseComponent } from '../../../_base/base/base.component';
import { SubscriptionTypeGroupsInterface } from '../../../../_models/api/subscriptions/subscription-type-groups-interface';
import { SubscriptionTypes } from '../../../../_models/components/subscription-types';
import { PaymentMethodInterface } from 'src/app/_models/api/payments/payment-method-interface';
import { StripeService } from 'ngx-stripe';
import { StripeAppService } from 'src/app/_services/payments/stripe-app.service';
import { ModalPaymentMethodComponent } from 'src/app/components/modal-payment-method/modal-payment-method.component';
import { AddSalesComponent } from '../../../admin/components/add-sales/add-sales.component';
import { CompanyInterface } from 'src/app/_models/api/companies/company-interface';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
})
export class SubscriptionsComponent extends BaseComponent implements OnInit {
  subscriptionsInterfaces: SubscriptionsInterface[] = [];
  usersInterface: UsersInterface[] = [];
  userCompanyRole: string;
  image: string;
  subscriptionTypes = SubscriptionTypes;
  roleCompanyOwner = RoleTypes.COMPANY_OWNER;
  premiumWidgetEnabled: boolean;

  constructor(
    private companyService: CompanyService,
    private usersService: UsersService,
    private stripeService: StripeAppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadSubscription().then();
    this.loadWidgetStatus().then();
  }

  loadWidgetStatus = async () => {
    const companyId = localStorage.getItem(StorageName.companyId);
    try {
      const response: Response<CompanyInterface> = await this.companyService.getCompanyById(companyId);
      const companyData = response.data;

      if(companyData.slug) {
        this.premiumWidgetEnabled = true;
      } else {
        this.premiumWidgetEnabled = false;
      }

    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getCompanySubscriptions = async () => {
    const companyId = localStorage.getItem(StorageName.companyId);
    try {
      const response: Response<SubscriptionsInterface[]> =
        await this.companyService.getCompanySubscriptions(companyId);
      if (response?.success) {
        this.subscriptionsInterfaces = response.data;
        /* for (const item of this.subscriptionsInterfaces) {
           if (array.map(it => it.id).indexOf(item.subscriptionType.groupId) === -1) {
             item.subscriptionType.group.subscriptionsTypes = [];
             array.push(item.subscriptionType.group);
           }
           const index = array.map(it => it.id).indexOf(item.subscriptionType.groupId);
           array[index].subscriptionsTypes.push(item.subscriptionType);
         }*/
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  getUserSubscriptions = async () => {
    const userId = localStorage.getItem(StorageName.id);
    try {
      const response: Response<SubscriptionsInterface[]> =
        await this.usersService.getUserSubscriptions(userId);
      if (response?.success) {
        this.subscriptionsInterfaces = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  loadSubscription = async () => {
    if (this.canSeeCompanyData()) {
      await this.getCompanySubscriptions();
    } else {
      await this.getUserSubscriptions();
    }
  };

  openSubscription = async (id: string) => {
    this.sharedService.subscriptionId = id;
    localStorage.setItem(StorageName.subscriptionId, id);
    await this.router.navigate(['./admin/users/subscriptions/details']);
  };

  openApiWidget = async () => {
    await this.router.navigate(['./admin/widget']);
  };

  onToggle = async () => {
    const companyId = localStorage.getItem(StorageName.companyId);
    const companyResponse: Response<CompanyInterface> = await this.companyService.getCompanyById(companyId);

    await this.companyService.updateCompanyById(companyId, {
      slug: this.premiumWidgetEnabled ? companyResponse.data.name : null
    });
  }

  getTotal = (item: SubscriptionTypeGroupsInterface): number => {
    let total = 0;
    item.subscriptionsTypes.forEach((it) => {
      total += it.costMonthly;
    });
    return total;
  };

  cancelSubscription = async (id: string) => {
    try {
      const response: Response<any> =
        await this.stripeService.cancelSubscriptions(id);
      if (response?.success) {
        this.loadSubscription().then();
      }
    } catch (error) {
      this.showErrorResponse(error?.error);
    }
  };

  confirmCancelSubscription(id: string) {
    this.openModal(
      this.translate.instant('cancelSubscription.title'),
      'small',
      this.translate.instant('cancelSubscription.text'),
      '',
      true,
      () => this.cancelSubscription(id),
      'Yes',
      'No'
    );
  }

  async openDialog(subscriptionId: string, subscription: SubscriptionsInterface): Promise<void> {
    this.dialog.open(AddSalesComponent, {
      data: {
        subscriptionId: subscriptionId,
        subscription: subscription,
        userId: localStorage.getItem(StorageName.id),
      },
    });
  }

  openModal = (
    modalTitle: string,
    type: string = typeof ModalType,
    primaryText: string,
    secondaryText?: string,
    seeAction?: boolean,
    action?: () => void,
    buttonLabel?: string,
    buttonCancelLabel?: string
  ) => {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: modalTitle,
        size: type,
        firstText: primaryText,
        secondText: secondaryText,
        showAction: seeAction,
        buttonText: buttonLabel,
        buttonCancelLabel: buttonCancelLabel,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        action();
      }
    });
  };
}
