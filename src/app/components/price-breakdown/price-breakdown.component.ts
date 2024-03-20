import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import { CountryPolicyService } from 'src/app/_services/country-policy/country-policy.service';
import { OrderSummaryService } from 'src/app/_services/public/local/order-summary.service';
import { UserTypes } from 'src/app/_models/components/user-types';

@Component({
  selector: 'app-price-breakdown',
  templateUrl: './price-breakdown.component.html',
  styleUrls: ['./price-breakdown.component.scss']
})
export class PriceBreakdownComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() summaryType: 'gift'|'singleDonation'|'subscriptions';
  @Input() integrationType: string = 'none';
  @Input() countryPolicy: string = 'none';
  priceBreakDown: any = { baseAmount: 0, taxAmount: 0 };
  clientType: string;

  constructor(private policyChangeService: CountryPolicyService,
    private cartService: OrderSummaryService) {
      super()
     }

  private updateClientType() {
    if(localStorage.getItem('clientType') === '1'){
      this.clientType = UserTypes.individual
    }else{
      this.clientType = UserTypes.business
    }
  }

  getTotals(type: string): void{
    const result  = this.cartService.getTotal(type, this.countryPolicy, this.clientType);
    this.priceBreakDown.baseAmount = this.roundNumber(result.baseAmount);
    this.priceBreakDown.taxAmount = this.roundNumber(result.taxAmount);
  }

  ngOnInit(): void {
    this.getTotals(this.summaryType);
    this.cartService.dataUpdated.subscribe(() => {
      this.getTotals(this.summaryType);
    });

    this.policyChangeService.countryChangeSubject.subscribe({
      next: (value) => {
        this.countryPolicy = value
        this.cartService.dataUpdated.emit()
      }
    })
    this.updateClientType()
  }

  ngAfterViewInit(): void {
    this.getTotals(this.summaryType)
  }
}
