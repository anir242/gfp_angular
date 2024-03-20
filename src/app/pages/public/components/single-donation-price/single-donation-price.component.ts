import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl, Validators} from '@angular/forms';
import { UnitTypes } from 'src/app/_models/components/unit-types';
import {SinglePaymentPacksInterface} from '../../../../_models/api/public/single-payment-packs-interface';
import { SinglePaymentsInterface } from '../../../../_models/api/public/single-payments-interface';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-single-donation-price',
  templateUrl: './single-donation-price.component.html',
  styleUrls: ['./single-donation-price.component.scss']
})
export class SingleDonationPriceComponent extends BaseComponent implements OnInit {
  @Output() emitter = new EventEmitter<string>();
  @Output() paymentObject = new EventEmitter<SinglePaymentsInterface>();
  @Input() offset = false;
  @Input() items: SinglePaymentPacksInterface;
  @Input() default?: any;
  @Input() bgColor?: any;
  @Input() selectAmount: boolean = true;
  cost: UntypedFormControl;
  units: UntypedFormControl;
  price: number;
  co2: number;
  unit: string;
  currency: string = '€';
  selectUnitsLabel: string;

  constructor() {
    super();
  }

  setColor = (color: string) => {
    return {
      'background-color': this.bgColor,
    };
  }

  ngOnInit(): void {
    this.inititalize();
    this.setUnitString();
  }

  inititalize(): void {
    this.getYearlyCO2();
    this.price = this.getUnitPrice();
    this.cost = new UntypedFormControl(this.price, [Validators.min(1)]);
    this.units = new UntypedFormControl(1, [Validators.min(1)]);
    this.co2 = this.estimateCO2(1);
    this.cost.valueChanges.subscribe((val) => {
      this.setUnits(val);
      this.setCo2();
    });
    this.units.valueChanges.subscribe((val) => {
      this.setCost(val);
      this.setCo2();
    });
    if (this.selectAmount) {
      this.viewProducts();
    }
  }

  setUnitString(): void {
    let unitStr = 'Amount';
    switch (this.items.unit?.slug) {
      case UnitTypes.TREE:
        unitStr = 'Trees';
        break;
      case UnitTypes.HECTARE:
      case UnitTypes.ACRE:
        unitStr = 'M2';
        break;
      case UnitTypes.KWH:
        unitStr = 'KWh'
        break;
      case UnitTypes.TONNE:
        unitStr = 'Tonnes'
        break;
      default:
        break;
    }
    this.selectUnitsLabel = this.translate.instant('supportProject.select' + unitStr);
  }

  setUnits(cost: number): void {
    if (!cost) {
      try {this.units.patchValue(0)} catch {}
    } else {
      let units = cost / this.price;
      try {
        if (units >= 1) {
          this.units.patchValue(this.roundNumber(units))
        } else {
          this.units.patchValue(1)
        }
      } catch {}
    }
    this.sendNullItem(cost);
    this.emitPaymentObject();
  }

  setCost(units: number): void {
    let cost = 0
    if (!units) {
      try {this.cost.patchValue(0)} catch {}
    } else {
      cost = units * this.price;
      try {
        this.cost.patchValue(this.roundNumber(cost, 2))
      } catch {}
    }
  }

  setCo2(): void {
    if (!this.offset) {
      this.co2 = this.estimateCO2(this.units.value);
    } else {
      this.co2 = this.units.value;
    }
  }

  getUnitPrice(): number {
    let unitPrice;
    let lowestItem;
    let lowestPrice = 1000;
    let lowestQuantity = 1;
    this.items.singlePayments?.forEach((item) => {
      const co2 = this.roundNumber(((item.quantity * this.items.unit.co2KgPerUnit) / 1000), 2);
      if (item.quantity == 1 || co2 == 1) {
        unitPrice = item.price;
      }
      if (item.price < lowestPrice) {
        lowestPrice = item.price;
        lowestQuantity = item.quantity;
        lowestItem = item;
      }
    });
    if (lowestQuantity < 1) {
      lowestQuantity = 1;
    }
    if (unitPrice) {
      return unitPrice;
    } else {
      return this.roundNumber(lowestPrice / lowestQuantity, 2)
    }
  }

  getYearlyCO2(): void {
    this.items.singlePayments?.forEach(item => {
      item.co2 = item.quantity * this.items.unit.co2KgPerUnit;
      if (this.items.unit.slug == UnitTypes.TREE) {
        item.co2 *= 12;
      }
    });
  }

  estimateCO2(val?: number) {
    if (this.offset) {
      return val;
    } else {
      this.unit = this.items.unit.slug;
      let units = val;
      let multiplier = 1;
      if (this.items.unit.slug == UnitTypes.TREE) {
        multiplier = 12;
      }
      const co2 = Math.floor(units * this.items.unit.co2KgPerUnit * multiplier);
      if (this.items.unit.slug == UnitTypes.HECTARE && units < 1) {
        units *= 10000;
        this.unit = 'm2';
      }
      return co2;
    }
  }

  emitPaymentObject() {
    let quantity = this.units.value;
    if (this.items?.unit?.slug === UnitTypes.KWH && this.offset) {
      quantity = this.units.value * 1000 / this.items?.unit?.co2KgPerUnit;
    }
    this.paymentObject.emit({
      id: null,
      packId: this.items.id,
      co2: this.co2,
      pack: this.items,
      price: this.cost.value,
      quantity: quantity
    })
  }

  sendNullItem(val?: number) {
    this.emitter.emit('select-' + val.toString());
  }

  sendItem(event): void{
    const items = document.querySelectorAll('#singlePrice .item');
    //console.log(event)
    items.forEach((item) => {
      item.classList.remove('selected');
    });
    const element = document.getElementById(event.source.id);
    let parent = element.parentElement;
    for (let i=0; i < 3; i++) {
      parent = parent.parentElement;
    }
    parent.classList.add('selected');
    const price = element.dataset.price;
    this.selectProduct(event.value, Number(price));
    this.emitter.emit(event.value);
  }

  viewProducts() {
    const products: any[] = [];
    this.items.singlePayments?.forEach((payment) => {
      products.push(this.asProduct(
        payment.id, this.items.project?.name + ' Donation', 'EUR', payment.price, 1, payment.price.toString(), 
        'singlePayments', this.items?.project?.type?.slug, 'singlePayments', 'Single Payments'
      ));
    });
    this.track('view_item_list', products);
  }

  selectProduct(id: string, price: number): void {
    this.track('select_item', [
      this.asProduct(
        id, this.items.project?.name + ' Donation', 'EUR', price, 1, 'EUR'+price.toString(), 
        'singlePayments', this.items.project?.type?.slug, 'singlePayments', 'Single Payments'
      )
    ]);
  }
}
