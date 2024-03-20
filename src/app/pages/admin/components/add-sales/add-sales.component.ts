import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionsInterface } from '../../../../_models/api/subscriptions/subscriptions-interface';
import { TransactionInterface } from '../../../../_models/api/transaction-interface';
import { BaseComponent } from '../../../_base/base/base.component';
import { TransactionsService } from '../../../../_services/subscriptions/transactions.service';
import { SubscriptionsService } from '../../../../_services/subscriptions/subscriptions.service';
import { AlertTypes } from '../../../../_models/components/alert-types';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss'],
})
export class AddSalesComponent extends BaseComponent implements OnInit {
  selectedTab: number = 0
  updatedAt: any
  subscription: SubscriptionsInterface;
  pioneerType = new UntypedFormControl();
  itemsOrRevenues = new UntypedFormControl(0);
  percentageOrItemToPlant = new UntypedFormControl(0);
  transaction: TransactionInterface;
  salesData = new UntypedFormGroup({
    revenuePercentage: new UntypedFormGroup({
      revenue: new UntypedFormControl('', [
        Validators.min(1),
        Validators.pattern(/\-?\d*\.?\d{1,2}/),
      ]),
      percentage: new UntypedFormControl('', [
        Validators.min(0.5),
        Validators.max(100),
        Validators.pattern(/\-?\d*\.?\d{1,2}/),
      ]),
    }),
    treePerItem: new UntypedFormGroup({
      items: new UntypedFormControl('', [
        Validators.min(1),
        Validators.pattern('^[0-9]*$'),
      ]),
      trees: new UntypedFormControl('', [
        Validators.min(1),
        Validators.pattern('^[0-9]*$'),
      ]),
    }),
  });

  baseAmount: number;
  taxAmount: number = 0;
  totalAmount: number;
  treesPlanted: number;
  areaProtected: number;
  co2Offset: number;

  constructor(
    private transactionService: TransactionsService,
    private subscriptionService: SubscriptionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    this.bindValues();
    this.setValues();
  }

  setValues(): void {
    this.subscription = this.data.subscription;
    const currentDate = new Date();
    this.updatedAt = new Date(currentDate.getFullYear(), currentDate.getMonth() + (currentDate.getDate() >= 15 ? 1 : 0), 15);

    if (this.subscription?.plantPerItems) {
      this.items.setValue(this.subscription.itemsSold);
      this.trees.setValue(this.subscription.plantPerItems);
      this.pioneerType.patchValue('treePerItem');
    } else if (this.subscription?.percentageToDonate) {
      this.revenue.setValue(this.subscription.itemsSold);
      this.percentage.setValue(this.subscription.percentageToDonate);
      this.pioneerType.patchValue('revenuePercentage');
    }
  }

  bindValues(): void {
    this.items.valueChanges.subscribe((value) => {
      this.treesPlanted = value * this.trees.value;
      this.setAmounts();
    });
    this.trees.valueChanges.subscribe((value) => {
      this.treesPlanted = value * this.items.value;
      this.setAmounts();
    });
    this.revenue.valueChanges.subscribe((value) => {
      this.treesPlanted = value * this.percentage.value / 100;
      this.setAmounts();
    })
    this.percentage.valueChanges.subscribe((value) => {
      this.treesPlanted = value * this.revenue.value / 100;
      this.setAmounts();
    })
  }

  setAmounts(): void {
    this.areaProtected = this.roundNumber(this.treesPlanted * 1.156, 2);
    this.co2Offset = this.roundNumber((this.treesPlanted * 1.025) + (this.areaProtected * 11), 2);
    this.baseAmount = this.roundNumber(this.treesPlanted, 2);
    if (this.subscription?.company?.vatNumber) {
      this.taxAmount = this.roundNumber(this.baseAmount * .22, 2);
    }
    this.totalAmount = this.roundNumber(this.baseAmount + this.taxAmount, 2);
    this.treesPlanted = Math.ceil(this.treesPlanted);
  }

  // async getSubscription(): Promise<void> {
  //   try {
  //     const response: Response<SubscriptionsInterface> =
  //       await this.subscriptionService.getSubscriptionDetails(
  //         this.data.subscriptionId
  //       );
  //     if (response?.success) {
  //       this.subscription = response.data;
  //     } else {
  //       this.showErrorResponse(response);
  //     }
  //   } catch (e) {
  //     this.showErrorResponse(e);
  //   }
  // }

  // getRenewalDate(): Date {
  //   const now = new Date();
  //   let date: Date = this.subscription.createdAt;
  //   while (date < now) {
  //     date = new Date(date.setMonth(date.getMonth() + 1));
  //   }
  //   return date;
  // }

  selected(e: any): void {
    this.selectedTab = e.index
  }

  async submit() {
    try {
      const value =
        this.pioneerType.value === 'revenuePercentage'
          ? (this.revenue.value * this.percentage.value) / 100
          : this.items.value * this.trees.value;
      const recharge = {
        subscriptionId: this.subscription.id,
        userId: this.data?.userId,
        quantity: value,
        value: value,
        currency: 'eur',
        date: new Date(),
        status: 'succeeded',
      };
      await this.transactionService.addSales(recharge);
      // const renewal = this.getRenewalDate();
      this.showAlert({
        text: 'Your impact has been added to your dashboard. You will be invoiced on your next subscription renewal date',
        title: 'Success!',
        type: AlertTypes.successMessage,
      });
    } catch (err) {
      this.showErrorResponse(err?.error);
    }
  }

  customValidateInput(): boolean {
    if (
      this.pioneerType.value === 'treePerItem' &&
      !this.salesData.valid &&
      (this.items.value === '' ||
        this.trees.value === '' ||
        this.items.value * this.trees.value < 20)
    )
      return true;
    else if (
      this.pioneerType.value === 'revenuePercentage' &&
      !this.salesData.valid &&
      (this.revenue.value === '' ||
        this.percentage.value === '' ||
        this.revenue.value * this.percentage.value < 20)
    )
      return true;
    else return false;
  }

  get revenuePercentage(): UntypedFormGroup {
    return this.salesData.get('revenuePercentage') as UntypedFormGroup;
  }

  get revenue(): UntypedFormControl {
    return this.revenuePercentage.get('revenue') as UntypedFormControl;
  }

  get percentage(): UntypedFormControl {
    return this.revenuePercentage.get('percentage') as UntypedFormControl;
  }

  get treePerItem(): UntypedFormGroup {
    return this.salesData.get('treePerItem') as UntypedFormGroup;
  }

  get items(): UntypedFormControl {
    return this.treePerItem.get('items') as UntypedFormControl;
  }

  get trees(): UntypedFormControl {
    return this.treePerItem.get('trees') as UntypedFormControl;
  }
}
