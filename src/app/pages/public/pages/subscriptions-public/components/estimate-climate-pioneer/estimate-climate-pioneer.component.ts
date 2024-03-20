import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  SubscriptionTypeValuesInterface
} from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';
import {SubscriptionTypesInterface} from '../../../../../../_models/api/subscriptions/subscription-types-interface';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ClimatePioneerTypes, ClimatePioneerModels } from '../../../../../../_models/components/climate-pioneer-types';
import {UnitTypes} from "../../../../../../_models/components/unit-types";

@Component({
  selector: 'app-estimate-climate-pioneer',
  templateUrl: './estimate-climate-pioneer.component.html',
  styleUrls: ['./estimate-climate-pioneer.component.scss']
})
export class EstimateClimatePioneerComponent implements OnInit, OnChanges {
  @Input() subscriptionTypes: SubscriptionTypesInterface[];
  @Input() pioneerModel: string;
  @Input() pioneerSelected: string;
  @Output() enableStartTop: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() itemsOrRevenues: UntypedFormControl;
  @Input() percentageOrItemToPlant: UntypedFormControl;
  supported = {};
  co2Values: SubscriptionTypeValuesInterface[];
  costPerMonth = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.calculateValues();
    this.itemsOrRevenues.valueChanges.subscribe(val => {
      this.setValues();
    });
    this.percentageOrItemToPlant.valueChanges.subscribe(val => {
      this.setValues();
    });
    if (this.pioneerModel) {
      this.setValues();
    }
  }

  calculateValues = () => {
    this.co2Values = [];
    this.supported = {};
    this.costPerMonth = 0;
  }

  setValues(): void {
    this.enableStartTop.emit(this.itemsOrRevenues.value > 0);
    this.costPerMonth = 0;
    this.co2Values = [];
    this.supported = {};
    this.subscriptionTypes?.forEach((item, index) => {
      if (item.slug === this.pioneerSelected) {
        item.subscriptionTypeValues?.forEach(value => {
          if (!(value.project.type.slug in this.supported)) {
            this.supported[value.project.type.slug] = [];
          }
          const quantity = this.pioneerModel === ClimatePioneerModels.revenuePercentage ? this.itemsOrRevenues.value * this.percentageOrItemToPlant.value / 100 : this.itemsOrRevenues.value * this.percentageOrItemToPlant.value;
          if (value.unit.slug === UnitTypes.TREE) {
            value.quantity = quantity;
            this.costPerMonth = value.quantity;

          } else {
            value.quantity = quantity * value.allocation;

          }

          this.supported[value.project.type.slug].push(value);
          const co2 = value.quantity * value.unit.co2KgPerUnit;
          const co2Project = {
            quantity: Math.round((co2 / 1000) * 100) / 100,
            project: {
              name: value.project.name
            }
          };
          this.co2Values.push(co2Project as SubscriptionTypeValuesInterface);

        });
      }

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    switch (changes?.pioneerModel.currentValue) {
      case ClimatePioneerModels.revenuePercentage:
        this.itemsOrRevenues.clearValidators();
        this.percentageOrItemToPlant.clearValidators();
        this.itemsOrRevenues.reset();
        this.percentageOrItemToPlant.patchValue(1);
        this.percentageOrItemToPlant.setValidators([Validators.min(1), Validators.max(100)]);
        this.itemsOrRevenues.patchValue(2000)
        this.itemsOrRevenues.setValidators([Validators.min(1000)]);
        break;
      case ClimatePioneerModels.treePerItem:
        this.itemsOrRevenues.clearValidators();
        this.percentageOrItemToPlant.clearValidators();
        this.itemsOrRevenues.patchValue(20);
        this.itemsOrRevenues.setValidators([Validators.min(10)]);
        this.percentageOrItemToPlant.patchValue(1);
        this.percentageOrItemToPlant.setValidators([Validators.min(1)]);
        break;

    }
  }

  roundNumber(val: number, approximation = 2): number {
    const app = 10 ** approximation;
    return Math.round(val * app) / app;
  }

}
