import {Component, Input, OnInit} from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import {GiftCardRecipientInterface} from '../../../../_models/api/public/gift-card-recipient-interface';
import {UnitTypes} from '../../../../_models/components/unit-types';

@Component({
  selector: 'app-gift-card-sent',
  templateUrl: './gift-card-sent.component.html',
  styleUrls: ['./gift-card-sent.component.scss']
})
export class GiftCardSentComponent extends BaseComponent implements OnInit {
  @Input() gift: GiftCardRecipientInterface;
  unitTypes = UnitTypes;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getUnitByType = (unit: string, createdAt: Date): number => {
    let total = 0;

    for (const cardProj of this.gift.giftCardPack.giftCardProjects) {
      if (unit !== 'CO2') {
        if (cardProj.unit.slug === unit) {
          total += cardProj.quantity;
        }
      } else {
        if (unit === this.unitTypes.TREE) {
          total += this.calculateCo2Trees(cardProj.quantity, 0, cardProj.unit.co2KgPerUnit, createdAt);
        } else {
          total += cardProj.unit.co2KgPerUnit * cardProj.quantity;
        }
      }

    }

    return total;
  }
}
