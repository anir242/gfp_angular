import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {SubscriptionTypesInterface} from '../../_models/api/subscriptions/subscription-types-interface';
import {OrderSummaryService} from '../../_services/public/local/order-summary.service';
import {SinglePaymentsInterface} from '../../_models/api/public/single-payments-interface';
import {CartTypes} from '../../_models/components/cart-types';
import {StorageName} from '../../_models/components/storage-name';
import { UserTypes } from 'src/app/_models/components/user-types';
import { CountryPolicyService } from 'src/app/_services/country-policy/country-policy.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent extends BaseComponent implements OnInit, AfterViewInit {
  cost = 0;
  @Input() total: number;
  @Input() title: string;
  @Input() costDescription: string;
  @Input() summaryType: 'gift'|'singleDonation'|'subscriptions';
  @Input() offset: boolean = false;
  @Input() countryPolicy: string = 'none';
  @Input() integrationType: string = 'none';
  @Input() freeAvailable: boolean = false;
  @Input() freeQuantity: number;
  @Input() pageType: string;

  currentSubType: SubscriptionTypesInterface;
  singleItem: SinglePaymentsInterface;
  items: any;
  clientType: string;
  

  constructor(
    private cartService: OrderSummaryService,
    private policyChangeService: CountryPolicyService
  ) {
    super();
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
    this.cost = this.roundNumber(result.totalCost);
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
  }
}
