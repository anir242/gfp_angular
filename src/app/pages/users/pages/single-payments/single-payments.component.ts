import { Component, OnInit } from '@angular/core';
import {GiftCardRecipientInterface} from '../../../../_models/api/public/gift-card-recipient-interface';
import {UsersService} from "../../../../_services/users/users.service";
import {BaseComponent} from "../../../_base/base/base.component";
import {TransactionInterface} from "../../../../_models/api/transaction-interface";
import {Response} from "../../../../_models/api/response";
import {StorageName} from "../../../../_models/components/storage-name";

@Component({
  selector: 'app-single-payments',
  templateUrl: './single-payments.component.html',
  styleUrls: ['./single-payments.component.scss']
})
export class SinglePaymentsComponent extends BaseComponent implements OnInit {
  payments: TransactionInterface[];

  constructor(
    private usersService: UsersService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadSinglePayment().then();
  }


  loadSinglePayment = async () => {
    try {
      const response: Response<any[]> = await this.usersService.getUserSinglePayment(localStorage.getItem(StorageName.id));
      if (response?.success) {
        this.payments = response.data;
      } else {
        this.showErrorResponse(response)
      }
    } catch (e) {
      this.showErrorResponse(e)
    }
  }

}
