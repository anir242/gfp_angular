import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {OrderSummaryService} from '../../_services/public/local/order-summary.service';
import {UnitTypes} from '../../_models/components/unit-types';
import {CartTypes} from '../../_models/components/cart-types';
import {ProjectTypes} from '../../_models/components/project-types';
import {ProjectsInterface} from '../../_models/api/projects/projects-interface';
import {CartInterface} from '../../_models/cart-interface';
import {SubscriptionTypeValuesInterface} from '../../_models/api/subscriptions/subscription-type-values-interface';
import { UserTypes } from 'src/app/_models/components/user-types';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent extends BaseComponent implements OnInit {
  @Input() type: string;
  @Input() data: any;
  @Input() location: string;
  @Input() offset: boolean = false;
  @Input() integrationType: string = 'none';
  @Input() freeAvailable: boolean = false;
  @Input() freeQuantity: number;
  @Input() countryPolicy?: string;

  map = new Map();
  cartItems: CartInterface[];
  totalQuantity = 0;
  items: any;
  value: string;
  title: string;
  clientType: string;
  projectTypes = [ProjectTypes.renewable_energy, ProjectTypes.preservation, ProjectTypes.restoration, ProjectTypes.marine_restoration];
  projectTypesName = ProjectTypes;
  projectsInterface: ProjectsInterface[] = [];
  totalCO2 = 0;
  showPriceBreakdown: boolean;
  // @Input() summaryType: 'gift' | 'singleDonation';
  @Input() summaryType: string;

  constructor(
    private cartService: OrderSummaryService,
  ) {
    super();
    this.updateClientType();
  }

  ngOnInit(): void {
    this.getTotals();
    this.getItems();
    this.cartService.dataUpdated.subscribe(() => {
      this.getItems();
    });
    if(this.clientType == UserTypes.business){
      this.showPriceBreakdown = true
    }else{
      this.showPriceBreakdown = false
    }

  }

  private updateClientType() {
    if(localStorage.getItem('clientType') === '1'){
      this.clientType = UserTypes.individual
    }else{
      this.clientType = UserTypes.business
    }
  }

  getItems(): void {
    switch (this.summaryType) {
      case CartTypes.SINGLE_DONATION: {
        this.cartItems = this.cartService.getItemsByType(this.summaryType);
        this.items = this.groupBy(this.cartItems, CartTypes.SINGLE_DONATION, 'project', 'type', 'slug');
        break;
      }
      case CartTypes.GIFT: {
        this.cartItems = this.cartService.getItemsByType(this.summaryType);
        const projects = [];
        this.cartItems.forEach(x => x.gift.giftCardPack.giftCardProjects.map(proj => {
          projects.push(proj);
        }));
        this.items = this.groupByGift(projects, 'project', 'type', 'slug');
        break;
      }
      case CartTypes.SUBSCRIPTION:
        this.cartItems = this.cartService.getItemsByType(this.summaryType);
        const projects = [];
        this.cartItems.forEach((x) => {
          x.subscriptions.forEach((subs) => {
            if (subs.quantity > 0) {
              const months = subs.frequency == 'year' ? 12 : 1;
              subs.projects.map(sv => sv).forEach(item => projects.push({sv: item, quantity: subs.quantity * months, type: subs.type}));
            }
          });
        });
        this.items = this.groupBySubscription(projects);
        break;
    }
  }

  getTotals(): void {
    this.totalCO2 = this.cartService.getTotal(this.summaryType).totalCo2;
    this.cartService.dataUpdated.subscribe(() => {
      this.totalCO2 = this.cartService.getTotal(this.summaryType).totalCo2;
    });
  }

  groupBySubscription = (array: { sv: SubscriptionTypeValuesInterface, quantity: number, type?: string }[]) => {
    const supported = {};
    for (const item of array) {
      if (!(item.sv.project.type.slug in supported)) {
        supported[item.sv.project.type.slug] = [];
      }
      const filterSVProject = supported[item.sv.project.type.slug].filter((it) => {
        return it.projectId === item.sv.projectId && it.unitId === item.sv.unitId;
      });
      if (filterSVProject.length > 0) {
        supported[item.sv.project.type.slug].forEach(it => {
          if (it.projectId === item.sv.projectId && it.unitId === item.sv.unitId) {
            it.initialQuantity = it.quantity;
            it.quantity = it.initialQuantity + item.sv.quantity * item.quantity;
          }
        });

      } else {
        if (item?.type) {
          item.sv.quantity = item.quantity

        } else {
          item.sv.initialQuantity = item.sv.quantity;
          item.sv.quantity = item.sv.initialQuantity * item.quantity;
        }
        supported[item.sv.project.type.slug].push(item.sv);
      }

    }

    return supported;
  }

  groupByGift = (array: any, key: string, subKey?: string, subKey2?: string, subKey3?: string) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key][subKey][subKey2]] = result[currentValue[key][subKey][subKey2]] || []).push(currentValue);
      return result;
    }, {});
  }

  groupBy = (array: CartInterface[], key: string, subKey?: string, subKey2?: string, subKey3?: string) => {
    if (subKey) {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key][subKey][subKey2][subKey3]] =
          result[currentValue[key][subKey][subKey2][subKey3]] || []).push(currentValue);
        return result;
      }, {});
    } else {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {});
    }
  }

  setColor = (color: string) => {
    return {
      'border-left': '10px solid' + color,
    };
  }

  checkType(): void {
    switch (this.type) {
      case      UnitTypes.TREE: {
        this.title = this.translate.instant('orderSummary.plant', {value: this.data});
        this.value = this.translate.instant('orderSummary.trees', {value: this.data});
        break;
      }
      case      UnitTypes.ACRE: {
        this.title = this.translate.instant('orderSummary.plant', {value: this.data});
        this.value = this.translate.instant('orderSummary.acre', {value: this.data});
        break;
      }
      case      UnitTypes.KWH: {
        this.title = this.translate.instant('orderSummary.plant', {value: this.data});
        this.value = this.translate.instant('orderSummary.Kw/h', {value: this.data});
        break;
      }
      case      UnitTypes.CORAL: {
        this.title = this.translate.instant('orderSummary.plant', {value: this.data});
        this.value = this.translate.instant('orderSummary.Kw/h', {value: this.data});
        break;
      }
    }
  }

  getColor(item: any, type: string):
    string {
    switch (this.summaryType) {
      case CartTypes.SINGLE_DONATION: {
        return this.cartService.getColorByType(item.value[0], type);
      }
      case CartTypes.GIFT: {
        return item.value[0].project.type.colorLabel;
      }
      case CartTypes.SUBSCRIPTION :
        return item.value[0].project.type.colorLabel;
    }
  }

  getProjectName(item: any):
    string {
    switch (this.summaryType) {
      case CartTypes.SINGLE_DONATION:
        return item.singleDonation.project.name;
      case CartTypes.GIFT:
        return item.project.name;
      case CartTypes.SUBSCRIPTION:
        return item.project.name;
    }
  }

  getQuantity(item: any, type: string ): number {
    switch (type) {
      case CartTypes.SINGLE_DONATION:
        // this.totalQuantity += item.singleDonation.paymentPack.quantity;
        return this.roundNumber(item.singleDonation.paymentPack.quantity, 4);
      case CartTypes.GIFT:
        // this.totalQuantity += this.totalQuantity + item.quantity;
        return this.roundNumber(item.quantity, 4);
      case CartTypes.SUBSCRIPTION:
        // this.totalQuantity += this.totalQuantity + item.quantity;
        return item.quantity
    }
  }

  getTotalQuantity(item: any, type: string): number {
    let total = 0;
    switch (type) {
      case CartTypes.SINGLE_DONATION:
        item.forEach(x => {
          total += x.singleDonation.paymentPack.quantity;
        });
        return this.roundNumber(total, 4);

      case CartTypes.GIFT:
        item.forEach(x => {
          total += x.quantity;
        });
        return this.roundNumber(total, 4);

      case CartTypes.SUBSCRIPTION:
        item.forEach(x => {
          total += x.quantity;
        });
        return total;

    }
  }
}
