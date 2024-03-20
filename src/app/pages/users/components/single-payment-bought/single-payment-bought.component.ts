import {Component, Input, OnInit} from '@angular/core';
import {UnitTypes} from '../../../../_models/components/unit-types';
import {TransactionInterface} from '../../../../_models/api/transaction-interface';
import {BaseComponent} from "../../../_base/base/base.component";

@Component({
  selector: 'app-single-payment-bought',
  templateUrl: './single-payment-bought.component.html',
  styleUrls: ['./single-payment-bought.component.scss']
})
export class SinglePaymentBoughtComponent extends BaseComponent implements OnInit {
  @Input() transaction: TransactionInterface;
  unitTypes = UnitTypes;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getUnitByType = (unit: string, createdAt: Date): number => {
    let total = 0;

    if (unit !== 'CO2') {
      if (this.transaction.singlePayment.pack.unit.slug === unit) {
        if (this.transaction.singlePayment.pack.unit.slug === UnitTypes.ACRE) {
          total += this.transaction.singlePayment.quantity * 4046.86;
        } else if (this.transaction.singlePayment.pack.unit.slug === UnitTypes.HECTARE) {
          total += this.transaction.singlePayment.quantity * 10000;
        } else {
          total += this.transaction.singlePayment.quantity;
        }
      }
    } else {
      if (unit === this.unitTypes.TREE) {
        total += this.calculateCo2Trees(this.transaction.singlePayment.quantity, 0, this.transaction.singlePayment.pack.unit.co2KgPerUnit, createdAt);
      } else {
        total += this.transaction.singlePayment.pack.unit.co2KgPerUnit * this.transaction.singlePayment.quantity;
      }
    }


    return total;
  }
}
