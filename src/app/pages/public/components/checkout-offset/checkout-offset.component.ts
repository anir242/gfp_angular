import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {LedgerService} from '../../../../_services/ledger/ledger.service';

@Component({
  selector: 'app-checkout-offset',
  templateUrl: './checkout-offset.component.html',
  styleUrls: ['./checkout-offset.component.scss']
})
export class CheckoutOffsetComponent extends BaseComponent implements OnInit {

  openPanel: number = 1;

  constructor(
    private ledgerService: LedgerService
  ) { 
    super()
  }

  ngOnInit(): void {
  }

}
