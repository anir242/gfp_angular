import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {GiftCardPacksInterface} from '../../../../_models/api/public/gift-card-packs-interface';
import {GiftCardProjects} from '../../../../_models/api/public/gift-card-projects';
import {UnitTypes} from '../../../../_models/components/unit-types';

@Component({
  selector: 'app-highlight-div',
  templateUrl: './highlight-div.component.html',
  styleUrls: ['./highlight-div.component.scss']
})
export class HighlightDivComponent extends BaseComponent implements OnInit {
  @Input() giftCardPack: GiftCardPacksInterface;
  @Input() color: string;
  @Input() highlightId: string;
  @Output() clickDiv = new EventEmitter<void>();
  @Input() subscriptionTitle?: string;
  finalItems;
  selectedDiv: string;
  selected: boolean;
  co2 = 0;
  co2String: string;
  cost = 0;
  unit: number;
  unitTypes = UnitTypes;
  periodSelected: number = 1;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.groupItems();

    if (this.subscriptionTitle) {
    }
    this.getCo2();
  }

  groupItems(): void {
    const items = [];
    this.giftCardPack.giftCardProjects.map(proj => {
      items.push(proj);
    });
    this.finalItems = this.groupByGift(items, 'project', 'type', 'slug');
  }

  groupByGift = (array: any, key: string, subKey?: string, subKey2?: string, subKey3?: string) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key][subKey][subKey2]] = result[currentValue[key][subKey][subKey2]] || []).push(currentValue);
      return result;
    }, {});
  }

  removeDuplicate(data: any): any {
    data = data.filter((element, i) => i === data.indexOf(element));
    return data;
  }

  highlight(id: string): any {
    this.selectedDiv = id;
  }

  getImageProjectPack(item: any): string {
    switch (item.unit.slug) {
      case 'acres': {
        return 'assets/images/svg/subs_preservation.svg';
        break;
      }
      case 'kw': {
        return 'assets/images/svg/subs_renewable_energy.svg';
        break;
      }
      case UnitTypes.CORAL: {
        return 'assets/images/svg/subs_marine.svg';
        break;
      }
      default:
        return 'assets/images/svg/subs_restoration.svg';
        break;
    }
  }

  getCo2(): void {
    this.periodSelected = this.giftCardPack.packTitle ? Number(this.giftCardPack.packTitle.split('-')[0]) : 1;
    this.giftCardPack.giftCardProjects.forEach(proj => {
      if (this.giftCardPack.packTitle && proj.unit.slug === UnitTypes.TREE) {
        this.co2 += this.calculateCo2Trees(proj.quantity, 0, proj.unit.co2KgPerUnit, new Date());
      } else {
        this.co2 += proj.quantity * proj.unit.co2KgPerUnit;
      }
    });
    if (this.co2 < 1000) {
      this.co2 = Math.ceil(this.co2);
      this.co2String = this.translate.instant('gift.co2Kg', {value: this.co2});
    } else {
      this.co2 = this.roundNumber(this.co2 / 1000, 3);
      this.co2String = this.translate.instant('gift.co2', {value: this.co2});
    }
  }

  getQuantity(item: any): any {
    let quantity = 0;
    item.forEach(x => {
      quantity += x.quantity;
    });
    return quantity;
  }
}
