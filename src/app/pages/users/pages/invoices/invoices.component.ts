import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {StorageName} from '../../../../_models/components/storage-name';
import {ModalType} from '../../../../_models/components/modal-types';
import {Response} from "../../../../_models/api/response";
import {ClimatePioneerTypes} from "../../../../_models/components/climate-pioneer-types";
import {SubscriptionsInterface} from "../../../../_models/api/subscriptions/subscriptions-interface";
import { UsersService } from '../../../../_services/users/users.service';
import {CompanyService} from "../../../../_services/companies/company.service";
import {SubscriptionTypes} from "../../../../_models/components/subscription-types";
import {TransactionsService} from "../../../../_services/subscriptions/transactions.service";
import {TransactionInterface} from "../../../../_models/api/transaction-interface";
import { StripeAppService } from '../../../../_services/payments/stripe-app.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent extends BaseComponent implements OnInit {
  columnsToDisplay: string[] = ['created', 'description', 'currency', 'total', 'status', 'action'];
  columnsToDisplayCharges: string[] = ['created', 'description', 'currency', 'amount', 'status', 'action'];
  labelsToDisplay: string[] = ['Date', 'Description', 'Currency', 'Total', 'Status', 'Action'];
  subscriptionId: string;
  subscription: SubscriptionsInterface;
  subscriptionTypes = SubscriptionTypes;
  image: string;
  dataSource: TransactionInterface[];
  invoices: any[];
  charges: any[];

  constructor(
    private userService: UsersService,
    private companyService: CompanyService,
    private transactionsService: TransactionsService,
    private stripeAppService: StripeAppService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptionId = localStorage.getItem(StorageName.subscriptionId);
    this.loadSubscription().then();
    this.loadInvoices().then();
    this.loadCharges().then();
  }

  loadInvoices = async () => {
    try {
      const response: Response<any> = await this.stripeAppService.invoices();
      if (response?.success) {
        this.invoices = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  loadCharges = async () => {
    try {
      const response: Response<any> = await this.stripeAppService.charges();
      if (response?.success) {
        this.charges = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  loadSubscription = async () => {
    if (this.canSeeCompanyData()) {
      // await this.getSubscription();
    }
    await this.loadTransactions();
  }

  loadTransactions = async () => {
    const userType = localStorage.getItem(StorageName.userType);
    try {
      let response: Response<TransactionInterface[]>;
      if (userType == 'business') {
        response = await this.companyService.getCompanyTransactions(localStorage.getItem(StorageName.companyId));
      } else {
        response = await this.userService.getUserTransactions(localStorage.getItem(StorageName.id));
      }
      if (response?.success) {
        this.dataSource = response.data;
      } else {
        this.showErrorResponse(response);

      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }

  getSubscription = async () => {
    try {
      const response: Response<any> =
        await this.companyService.getCompanySubscriptionsById(localStorage.getItem(StorageName.companyId), this.subscriptionId);
      if (response?.success) {
        this.subscription = response.data.subscription;
        if (this.subscription.subscriptionType.group.slug === this.subscriptionTypes.climateLeader) {
          this.image = this.subscription.subscriptionType.group.images.url;
        } else if (ClimatePioneerTypes.manual === this.subscription.subscriptionType.slug) {
          this.image = this.subscription.subscriptionType.group.images.url;
        } else {
          this.image = this.subscription.subscriptionType.group.images.url;
        }

      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getCurrencySymbol(locale, currency): void {
    (0).toLocaleString(
      locale,
      {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).replace(/\d/g, '').trim()
  }

  downloadInvoice = async (id) =>  {
    try {
      const response: Response<string> = await this.transactionsService.downloadInvoice(id);
      if(response?.success) {
        window.open(response.data, '_blank');
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  openReceipt = async (url) =>  {
    window.open(url);
  }
}
