import {EventEmitter, Injectable} from '@angular/core';
import {BaseComponent} from '../../../pages/_base/base/base.component';
import {CartTypes} from '../../../_models/components/cart-types';
import {OrderSummaryInterface} from '../../../_models/order-summary-interface';
import {element} from 'protractor';
import {ProjectTypesInterface} from '../../../_models/api/projects/project-types-interface';
import {UnitInterface} from '../../../_models/api/public/unit-interface';
import {StorageName} from '../../../_models/components/storage-name';
import {CartInterface} from '../../../_models/cart-interface';
import {SinglePaymentPacksInterface} from '../../../_models/api/public/single-payment-packs-interface';
import {SinglePaymentsInterface} from '../../../_models/api/public/single-payments-interface';
import {UnitTypes} from '../../../_models/components/unit-types';
import {translate} from '@angular/localize/tools';
import {ProjectSlugs} from '../../../_models/components/project-slugs';
import {ProjectTypes} from '../../../_models/components/project-types';
import { UserTypes } from '../../../_models/components/user-types';

@Injectable({
  providedIn: 'root'
})
export class OrderSummaryService extends BaseComponent {
  cartItems: CartInterface[] = [];
  dataUpdated: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }


  getItems(): any[] {
    this.cartItems = JSON.parse(localStorage.getItem(StorageName.cart));
    return this.cartItems;
  }

  getItemsByType(type: string): CartInterface[] {
    this.getItems();
    if (this.storageExist()) {
      return this.cartItems.filter(x => x.internalType === type);
    } else {
      return [];
    }
  }

  setItems(carts: CartInterface[]): void {
    localStorage.setItem(StorageName.cart, JSON.stringify(carts));
  }

  isCartEmpty(): any {
    this.getItems();
    return this.cartItems.length === 0;
  }

  isCartEmptyByType(type: string): any {
    return this.getItemsByType(type)?.length === 0;
  }

  addToCart(item: CartInterface): void {
    this.getItems();
    this.cartItems.push(item);
    this.setItems(this.cartItems);
    // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
    if (item.gift) {
      this.dataUpdated.emit(true); // trigger navbar badge
    } else {
      this.dataUpdated.emit();
    }
  }

  addSenderData(name: string, surname: string, email: string, phone: string, marketingConsent: boolean, privacyConsent: boolean): void {
    this.getItems();
    this.cartItems.forEach(x => {
      if (x.internalType === CartTypes.GIFT) {
        x.gift.sender = {
          name,
          surname,
          email,
          phone,
          marketingConsent,
          privacyConsent
        };
      }
    });
    this.setItems(this.cartItems);
    // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
    this.dataUpdated.subscribe();
  }


  setPromoCode(code: string): void {
    this.getItems();

    this.cartItems.forEach(x => {
      if (x.internalType === CartTypes.SINGLE_DONATION) {
        if (code.length > 0) {
          x.singleDonation.promoCode = code;
        } else {
          if (x.singleDonation.promoCode) {
            delete x.singleDonation.promoCode;
          }
        }
      }
    });
    this.setItems(this.cartItems);
  }

  addBillingData(same: boolean, country?: string, sdi?: string, city?: string, streetHouse?: string, apartment?: string, zip?: string, vatNumber?: string, companyName?: string, pec?: string): void {
    this.getItems();
    this.cartItems.forEach(x => {
      if (x.internalType !== CartTypes.GIFT) {
        if (same) {
          x.singleDonation.sameAsCompany = same;
          delete x.singleDonation.billingAddress;
        } else {
          x.singleDonation.sameAsCompany = same;
          x.singleDonation.billingAddress = {
            country,
            sdi,
            city,
            streetHouse,
            apartment,
            zip,
            vatNumber,
            companyName,
            pec
          };
        }
      }
    });
    this.setItems(this.cartItems);
    // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
    this.dataUpdated.subscribe();
  }

  getCardById(id: string): any {
    this.cartItems = this.getItems();
    return this.cartItems.filter(x => x.id === id)[0];
  }

  storageExist(): any {
    if (!localStorage.getItem(StorageName.cart)) {
      localStorage.setItem(StorageName.cart, '[]');
      return false;
    }
    return true;
  }

  clearCartByType(type: string): any {
    if (this.storageExist()) {
      this.cartItems = this.getItems();
      this.cartItems = this.cartItems.filter(x => x.internalType !== type);
      localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
      this.dataUpdated.emit();
    }
  }

  deleteItem(singleItem: CartInterface): void {
    let index = 0;
    const items = this.getItems();
    items.forEach(item => {
      if (JSON.stringify(item) === JSON.stringify(singleItem)) {
        index = this.cartItems.indexOf(item);
      }
    });
    this.cartItems.splice(index, 1);
    this.setItems(this.cartItems);
    // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
    this.dataUpdated.emit(true);
  }

  removeItem(): any {
    this.cartItems = [];
    localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
  }

  private getTaxInclusiveTotal(cost: number, co2: number, countryPolicy: string, clientType: string){
    let data;
    if(clientType === UserTypes.individual){
      data = {
        totalCost: cost,
        totalCo2: co2,
      };
    }else{
      if(countryPolicy === 'italian') {
        const baseAmount = cost
        const taxAmount = 0.22 * cost
        data = {
          totalCost: baseAmount + taxAmount,
          totalCo2: co2,
          baseAmount: baseAmount,
          taxAmount: taxAmount
        }
      }else{
        data = {
          totalCost: cost,
          totalCo2: co2,
          baseAmount: cost,
          taxAmount: 0
        }
      }
    }
    return data;
  }

  getTotal(type?: string, countryPolicy?: string, clientType?: string): { totalCo2: number; totalCost: number, baseAmount?: number, taxAmount?: number } {
    const itemByType = this.getItemsByType(type);

    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        let co2 = 0;
        let cost = 0;
        itemByType.forEach(item => {
          co2 += this.roundNumber((item.singleDonation.unit?.co2KgPerUnit * item.singleDonation.paymentPack.quantity) / 1000, 5);
          cost += item.singleDonation.paymentPack.price;
        });
        return this.getTaxInclusiveTotal(cost, co2, countryPolicy, clientType);
      }
      case CartTypes.GIFT: {
        let co2 = 0;
        let cost = 0;
        itemByType.forEach(item => {
          item.gift.giftCardPack.giftCardProjects.forEach(proj => {
            if (item.gift.giftCardPack.packTitle && proj.unit.slug === UnitTypes.TREE) {
              co2 += proj.quantity * proj.unit?.co2KgPerUnit * +item.gift.giftCardPack.packTitle.split('-')[0];
            } else {
              co2 += proj.quantity * proj.unit?.co2KgPerUnit;
            }
          });
          cost += this.roundNumber((item.gift.giftCardPack.giftCardValue));
        });

        return this.getTaxInclusiveTotal(cost, this.roundNumber(co2/1000), countryPolicy, clientType);
      }
      case CartTypes.SUBSCRIPTION:
        let co2 = 0;
        let cost = 0;
        const itemsType = this.getItemsByType(CartTypes.SUBSCRIPTION);
        itemsType.forEach((item: CartInterface) => {
          item.subscriptions.forEach((subs) => {
            if (subs.quantity > 0) {
              if (subs?.type) {
                subs.projects.forEach((project) => {
                  co2 += subs.quantity * project.unit.co2KgPerUnit;
                  if (project.unit.slug === UnitTypes.TREE) {
                    cost += project.quantity;
                  }
                });
              } else {
                const months = subs.frequency === 'year' ? 12 : 1;
                subs.projects.forEach((project) => {
                  let quantity = project.quantity;
                  if (project.unit.slug == UnitTypes.ACRE) {
                    quantity = quantity * 0.404686;
                  }
                  co2 += quantity * project.unit?.co2KgPerUnit * subs.quantity * months;
                });
                cost += subs.cost * subs.quantity;
              }
            }
          });
        });
        return this.getTaxInclusiveTotal(cost, this.roundNumber(co2/1000), countryPolicy, clientType);
      default: {
        let co2 = 0;
        let cost = 0;
        let itemsType = this.getItemsByType(CartTypes.SINGLE_DONATION);
        itemsType.forEach(item => {
          co2 += this.roundNumber((item.singleDonation.unit.co2KgPerUnit * item.singleDonation.paymentPack.quantity) / 1000);
          cost += item.singleDonation.paymentPack.price;
        });
        itemsType = this.getItemsByType(CartTypes.GIFT);
        itemsType.forEach(item => {
          item.gift.giftCardPack.giftCardProjects.forEach(
            x => {
              co2 += x.unit.co2KgPerUnit * x.quantity;
            }
          );
          cost += this.roundNumber((item.gift.giftCardPack.giftCardValue));
        });
        return this.getTaxInclusiveTotal(cost, this.roundNumber(co2/1000), countryPolicy, clientType);
      }
    }
  }

  switchItem(oldPack: any, newPack: any, internalType: string): any {
    this.cartItems = this.getItems();
    let index: number;
    switch (internalType) {
      case CartTypes.SINGLE_DONATION: {
        this.cartItems.forEach(item => {
          if (item.singleDonation) {
            if (oldPack.id === item.singleDonation.paymentPack.id) {
              index = this.cartItems.indexOf(item);
            }
          }
        });
        this.cartItems[index].singleDonation.paymentPack = newPack;
        this.setItems(this.cartItems);
        // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
        this.dataUpdated.emit();
        return this.cartItems[index];
      }
      case CartTypes.GIFT: {
        this.cartItems.forEach(item => {
          if (item.gift) {
            if (oldPack.id === item.gift.giftCardPack.id) {
              index = this.cartItems.indexOf(item);
            }
          }
        });
        this.cartItems[index].gift.giftCardPack = newPack;
        this.setItems(this.cartItems);
        // localStorage.setItem(StorageName.cart, JSON.stringify(this.cartItems));
        this.dataUpdated.emit();
        return this.cartItems[index];
      }
    }
  }

  getColorByType(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        return item.singleDonation.project.type.colorSecondary;
        break;
      }
      case CartTypes.GIFT: {
        if (item.gift.type.id) {
          return item.gift.type.colorLabel;
        } else {
          return '#D3DFDB';
        }
      }
    }
  }

  getProjectName(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        const slug = item.gift.giftCardPack.giftCardProjects.map(x => x.project.name);
        return slug;
        break;
      }
    }
  }

  getProjectTypeName(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        if (item.gift.type.id) {
          return item.gift.type.name;
        } else {
          return 'Subscription';
        }
      }
    }
  }

  getCardTitle(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        const cardTitle = item.gift.giftCardPack.giftCardProjects.map(x => x.unit.slug);
        if (item.gift.type.id) {
          if (cardTitle.includes(UnitTypes.CORAL)) {
            return this.translate.instant('gift.' + cardTitle[cardTitle.indexOf(UnitTypes.CORAL)] + 'Gift');
          } else {
            return this.translate.instant('gift.' + cardTitle[0] + 'Gift');
          }

        } else {
          return this.translate.instant('gift.climatePositive');
        }
      }
    }
  }

  getUnitCard(item: CartInterface, type: string): any {
    const unit = item.gift.giftCardPack.giftCardProjects.map(x => x.unit.slug);
    if (item.gift.type.id) {
      if (unit.includes(UnitTypes.CORAL)) {
        return UnitTypes.CORAL;
      } else {
        return unit;
      }
    } else {
      return 'subscription';
    }
  }

  getSingleCo2(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        let co2 = 0;
        item.gift.giftCardPack.giftCardProjects.forEach(proj => {
          if (item.gift.giftCardPack.packTitle && proj.unit.slug === UnitTypes.TREE) {
            co2 += proj.quantity * proj.unit.co2KgPerUnit * +item.gift.giftCardPack.packTitle.split('-')[0];
          } else {
            co2 += proj.quantity * proj.unit.co2KgPerUnit;
          }
        });
        /*        item.gift.giftCardPack.giftCardProjects.forEach(x => {
                  co2 += x.unit.co2KgPerUnit * x.quantity;
                });*/
        return this.roundNumber(co2 / 1000);
        break;
      }
    }
  }

  getProjectData(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        let data = 0;
        if (item.gift.type.id) {
          if (item.gift.giftCardPack.giftCardProjects.length > 1) {
            item.gift.giftCardPack.giftCardProjects.filter(x => x.project.type.slug === ProjectTypes.marine_restoration).forEach(y => {
              data += y.quantity;
            });
          } else {
            item.gift.giftCardPack.giftCardProjects.forEach(x => {
              data += x.quantity;
            });
          }
        } else {
          const z = item.gift.giftCardPack.packTitle.split('-')[0];
          data = +z;
        }
        return data;
        break;
      }
    }
  }

  getTotalCo2(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        let co2 = 0;
        item.gift.giftCardPack.giftCardProjects.forEach(x => {
          co2 += x.unit.co2KgPerUnit * x.quantity;
        });
        return this.roundNumber(co2 / 1000);
        break;
      }
    }
  }

  getProjectAmount(item: CartInterface, type: string): any {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        break;
      }
      case CartTypes.GIFT: {
        const items = [];
        if (item.gift.type.id) {
          if (item.gift.giftCardPack.giftCardProjects.length > 1) {
            (item.gift.giftCardPack.giftCardProjects.filter(x => {
              if (x.unit.slug === UnitTypes.CORAL) {
                items.push(x.quantity);
              }
            }));
          } else {
            (item.gift.giftCardPack.giftCardProjects.filter(x => {
              items.push(x.quantity);
            }));
          }
          return items;
        } else {
          items.push(this.translate.instant('gift.' + item.gift.giftCardPack.packTitle));
          return items;
        }
        break;
      }
    }
  }
}
