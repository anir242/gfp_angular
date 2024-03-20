import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubscriptionTypesInterface} from '../../../../../../_models/api/subscriptions/subscription-types-interface';
import {UntypedFormArray} from '@angular/forms';
import {UnitTypes} from '../../../../../../_models/components/unit-types';
import {SubscriptionTypeValuesInterface} from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';
import {MatButton} from '@angular/material/button';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-impact-employees',
  templateUrl: './impact-employees.component.html',
  styleUrls: ['./impact-employees.component.scss']
})
export class ImpactEmployeesComponent extends BaseComponent implements OnInit {
  @Input() subscriptionTypes: SubscriptionTypesInterface[];
  @Input() employeesSelected: UntypedFormArray;
  supported = {};
  costPerMonth = 0;
  co2Values: SubscriptionTypeValuesInterface[];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.employeesSelected.valueChanges.subscribe((it) => {
      this.calculateValues();
    });
  }

  getTotalEmployees = () => {
    return this.employeesSelected.controls.reduce((sum, current) => sum + current.value, 0);
  }

  calculateValues = () => {
    this.co2Values = [];
    this.supported = {};
    this.costPerMonth = 0;
    this.subscriptionTypes?.forEach((it, index) => {
      this.costPerMonth += it.costMonthly * this.employeesSelected.controls[index].value;
      for (const value of it.subscriptionTypeValues) {
        if (!(value.project.type.slug in this.supported)) {
          this.supported[value.project.type.slug] = [];
        }
        if (this.employeesSelected.controls[index].value > 0) {
          const quantity = value.initialQuantity ? value.initialQuantity : value.quantity;
          value.initialQuantity = quantity;
          value.quantity = quantity * this.employeesSelected.controls[index].value;
          this.supported[value.project.type.slug].push(value);
          const co2 = value.quantity * value.unit.co2KgPerUnit;
          const co2Project = {
            quantity: this.roundNumber(co2 / 1000),// Math.round((co2 / 1000) * 100) / 100,
            project: {
              name: value.project.name
            }
          };
          this.co2Values.push(co2Project as SubscriptionTypeValuesInterface);
        }
      }
    });
  }
}
