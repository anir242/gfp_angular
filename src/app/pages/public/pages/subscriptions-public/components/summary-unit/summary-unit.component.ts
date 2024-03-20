import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionTypeValuesInterface} from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';
import {ProjectTypes} from "../../../../../../_models/components/project-types";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-summary-unit',
  templateUrl: './summary-unit.component.html',
  styleUrls: ['./summary-unit.component.scss']
})
export class SummaryUnitComponent implements OnInit {
  @Input() key: string;
  @Input() unit: string;
  @Input() multiplier = 1;
  @Input() border = false;

  projectTypesName = ProjectTypes;

  totalCO2: 0;
  @Input() items: SubscriptionTypeValuesInterface[];

  constructor(
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  roundNumber(val: number, approximation = 2): number {
    const app = 10 ** approximation;
    return Math.round(val * app) / app;
  }

  getTotal = () => {
    let total = 0;
    for (const item of this.items) {
      total += item.quantity;
    }
    return total;
  }

  setColor = (color: string) => {
    return {
      'border-left': '10px solid' + color,
    };
  }

  getPreservationValue(data: number): any {
    if (data >= 1) {
      return this.translate.instant('orderSummary.hectareUnit', {value: this.roundNumber(data, 5)});
    } else {
      return this.translate.instant('orderSummary.m2Unit', {value: this.roundNumber(data * 10000)});
    }
  }

}
