import {Component, Input, OnInit} from '@angular/core';
import {SubscriptionTypesInterface} from '../../../../../../_models/api/subscriptions/subscription-types-interface';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UnitSlugs} from "../../../../../../_models/components/unit-slugs";
import {UntypedFormControl} from "@angular/forms";
import { UnitTypes } from 'src/app/_models/components/unit-types';

@Component({
  selector: 'app-business-subscription-type-recap',
  templateUrl: './business-subscription-type-recap.component.html',
  styleUrls: ['./business-subscription-type-recap.component.scss']
})
export class BusinessSubscriptionTypeRecapComponent extends BaseComponent implements OnInit {
  @Input() subscriptionType: SubscriptionTypesInterface;
  @Input() quantity = new UntypedFormControl(0);
  unitTypes = UnitTypes;
  co2: number = 0;
  co2Str: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (!this.quantity) {
      this.quantity = new UntypedFormControl(0);
    }
    this.getCo2();
    this.getCo2String();
    this.quantity?.valueChanges.subscribe(() => {
      this.getCo2String();
    });
  }


  selectValues = (): number[] => {
    return Array.from(Array(100).keys());
  }

  getQuantityForType = (slug: string) => {  
    let quantity = 0;
    for (const value of this.subscriptionType?.subscriptionTypeValues) {
      if (value.unit.slug === slug) {
        if (value.unit.slug == UnitTypes.ACRE) {
          quantity += value.quantity * 0.404686;
        } else {
          quantity += value.quantity;
        }
      }
    }
    return quantity;
  }

  getCo2(): void {
    for (const value of this.subscriptionType?.subscriptionTypeValues) {
      if (value.unit?.slug === UnitTypes.TREE) {
        this.co2 += this.calculateCo2Trees(value.quantity, value.quantity, value.unit?.co2KgPerUnit, new Date());
      } else {
        this.co2 += value.quantity * value.unit?.co2KgPerUnit;
      }
    }
  }

  getCo2String(): void {
    let value = 0;
    if (this.quantity) {
      value = this.quantity.value;
    }
    const totalCo2 = this.co2 * value;
    if (totalCo2  > 1000) {
      this.co2Str = this.translate.instant('mainSubscriptions.checkout.business.co2OffsetValueTonnes', {value: this.roundNumber(totalCo2 / 1000, 2)})
    } else {
      this.co2Str = this.translate.instant('mainSubscriptions.checkout.business.co2OffsetValueKg', {value: this.roundNumber(totalCo2, 0)})
    }
  }

}


