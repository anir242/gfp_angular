import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriptionTypesInterface} from '../../../../_models/api/subscriptions/subscription-types-interface';

@Component({
  selector: 'app-subscription-details-summary',
  templateUrl: './subscription-details-summary.component.html',
  styleUrls: ['./subscription-details-summary.component.scss']
})
export class SubscriptionDetailsSummaryComponent implements OnInit {
  @Input() employee = 0;
  @Input() monthPerEmployee = 0;
  @Input() cost = 0;
  @Input() type: SubscriptionTypesInterface;
  @Output() action = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.employee = this.type.companyEmployees.length;
    this.monthPerEmployee = this.type.costMonthly;
    this.cost = this.employee * this.monthPerEmployee;
  }
}
