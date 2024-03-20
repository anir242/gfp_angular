import {Component, Input, OnInit} from '@angular/core';
import {CartInterface} from '../../../../../../_models/cart-interface';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {Portal} from '@angular/cdk/portal';
import {ProjectTypes} from '../../../../../../_models/components/project-types';
import {UnitTypes} from '../../../../../../_models/components/unit-types';
import {
  SubscriptionTypeValuesInterface
} from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';

@Component({
  selector: 'app-summary-welcome-on-board',
  templateUrl: './summary-welcome-on-board.component.html',
  styleUrls: ['./summary-welcome-on-board.component.scss']
})
export class SummaryWelcomeOnBoardComponent extends BaseComponent implements OnInit {
  cartTypes = CartTypes;
  @Input() items: CartInterface[];
  @Input() type: string;
  groupItems: any;
  @Input() total = 0;
  @Input() totalCo2 = 0;
  @Input() tonnesOnly = false;
  projectTypesName = ProjectTypes;
  productIcon: string = 'invest';
  productName: string = this.translate.instant('gift.orderSummary');
  co2Unit: string = 'kg';

  constructor(
    private cartService: OrderSummaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getItems();
    this.getTotal();
  }

  checkCart(): void {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION: {
        if (this.cartService.getItemsByType(CartTypes.SINGLE_DONATION).length === 0) {
          this.router.navigate([RoutingTypes.HOME_PUBLIC]).then();
        }
        break;
      }
      case CartTypes.GIFT: {
        if (this.cartService.getItemsByType(CartTypes.GIFT).length === 0) {
          this.router.navigate([RoutingTypes.GIFT]).then();
        }
        break;
      }
    }
  }

  getItems(): void {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION: {
        this.groupItems = this.groupBy(this.items, CartTypes.SINGLE_DONATION, 'project', 'type', 'slug');
        this.productName = this.translate.instant('welcomeOnBoard.investProject');
        this.items.forEach((x) => {
          if (x.singleDonation?.unit?.slug == 'tonne' || x.singleDonation?.unit?.slug == 'kwh') {
            this.tonnesOnly = true;
          }
        })
        break;
      }
      case CartTypes.GIFT: {
        this.productName = this.translate.instant('welcomeOnBoard.gift');
        this.productIcon = 'gifts';
        const projects = [];
        this.items.forEach((item) => {
          this.productName = item.gift.giftCardPack.giftCard?.title;
        });
        this.items.forEach(x => x.gift.giftCardPack.giftCardProjects.map(proj => {
          projects.push(proj);
        }));
        this.groupItems = this.groupByGift(projects, 'project', 'type', 'slug');
        break;
      }
      case CartTypes.SUBSCRIPTION:
        this.productName = this.translate.instant('welcomeOnBoard.subscription');
        this.productIcon = 'monthly';
        this.productIcon = 'monthly';
        const projects = [];
        this.items.forEach((x) => {
          x.subscriptions.forEach((subs) => {
            if (subs.quantity > 0) {
              subs.projects.forEach((stv) => {
                let subType;
                if (stv.subscriptionType) {
                  subType = stv.subscriptionType;
                  if (!subType.name.startsWith('Climate') && subType.group) {
                    subType = subType.group;
                    this.productIcon = 'positive';
                  }
                }
                if (subType) {
                  this.productName = subType.name;
                }
              });
              subs.projects.map(sv => sv).forEach(item => projects.push({sv: item, quantity: subs.quantity, type: subs.type}));
            }
          });
        });
        this.groupItems = this.groupBySubscription(projects);
        break;
    }
    this.productIcon = '/assets/images/public/menu/' + this.productIcon + '.png';
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
          item.sv.quantity = item.quantity;

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

  getTotal(): void {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION: {
        this.items.forEach(item => {
          this.totalCo2 += item.singleDonation.unit.co2KgPerUnit * item.singleDonation.paymentPack.quantity;
          this.total += item.singleDonation.paymentPack.price;
        });
        break;
      }
      case CartTypes.GIFT: {
        /*        this.items.forEach(item => {
                  item.gift.giftCardPack.giftCardProjects.forEach(
                    x => {
                      this.totalCo2 += this.roundNumber(x.unit.co2KgPerUnit * x.quantity / 1000);
                    }
                  );
                  this.total += this.roundNumber((item.gift.giftCardPack.giftCardValue));
                });*/
        this.items.forEach(item => {
          item.gift.giftCardPack.giftCardProjects.forEach(proj => {
            if (item.gift.giftCardPack.packTitle && proj.unit.slug === UnitTypes.TREE) {
              this.totalCo2 += proj.quantity * proj.unit.co2KgPerUnit * +item.gift.giftCardPack.packTitle.split('-')[0];
            } else {
              this.totalCo2 += proj.quantity * proj.unit.co2KgPerUnit;
            }
          });
          this.total += this.roundNumber((item.gift.giftCardPack.giftCardValue));
        });
        break;
      }
      case CartTypes.SUBSCRIPTION:
        this.totalCo2 = this.cartService.getTotal(this.type).totalCo2 * 1000;
        this.total = this.cartService.getTotal(this.type).totalCost;
        break;
    }
    if (this.totalCo2 >= 1000) {
      this.totalCo2 = this.roundNumber(this.totalCo2 / 1000, 2);
      this.co2Unit = 'tonnes';
    } else {
      this.totalCo2 = Math.floor(this.totalCo2);
    }
  }

  setColor = (color: string) => {
    return {
      'border-left': '10px solid' + color,
    };
  }

  getColor(item: any): string {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION:
        return item.value[0].singleDonation.project.type.colorSecondary;

      case CartTypes.GIFT:
        return item.value[0].project.type.colorLabel;

      case CartTypes.SUBSCRIPTION :
        return item.value[0].project.type.colorLabel;
    }
  }

  getProjectName(item: any): string {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION:
        return item.singleDonation.project.slug;

      case CartTypes.GIFT:
        return item.project.name;
      case CartTypes.SUBSCRIPTION:
        return item.project.name;

    }
  }

  getQuantity(item: any): number {
    switch (this.type) {
      case CartTypes.SINGLE_DONATION:
        return this.roundNumber(item.singleDonation.paymentPack.quantity, 4);

      case CartTypes.GIFT:
        return this.roundNumber(item.quantity, 4);

      case CartTypes.SUBSCRIPTION:
        return this.roundNumber(item.quantity, 4);

    }
  }

  groupBy = (array: CartInterface[], key: string, subKey?: string, subKey2?: string, subKey3?: string) => {
    if (subKey) {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key][subKey][subKey2][subKey3]] = result[currentValue[key][subKey][subKey2][subKey3]] || []).push(currentValue);
        return result;
      }, {});
    } else {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {});
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
        return this.roundNumber(total, 4);
    }
  }
}
