import {EventEmitter, Injectable, Input} from '@angular/core';
import {BaseComponent} from '../../../pages/_base/base/base.component';
import {OrderSummaryInterface} from '../../../_models/order-summary-interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService extends BaseComponent{
  filters = {
    typology: this.translate.instant('projectList.allProjects'),
    continent: this.translate.instant('projectList.allContinents'),
    giftTypology: this.translate.instant('gift.allTypologies'),
    giftContinent: this.translate.instant('gift.allContinents')
  };
  dataUpdated: EventEmitter<any> = new EventEmitter();
  types: 'continent' | 'typology'|'giftTypology'|'giftContinent';

  constructor() {
    super();
  }
  resetFilter(): void{
    this.filters.giftTypology = this.translate.instant('gift.allTypologies');
    this.filters.continent = this.translate.instant('projectList.allContinents');
    this.filters.giftContinent = this.translate.instant('gift.allContinents');
    this.filters.typology = this.translate.instant('projectList.allProjects');
  }

  addFilter(item: string, type = this.types, mobile?: boolean): void {
    switch (type) {
      case 'continent': {
        this.filters.continent = item;
        break;
      }
      case 'typology': {
        this.filters.typology = item;
        break;
      }
      case 'giftTypology': {
        this.filters.giftTypology = item;
        break;
      }
      case 'giftContinent': {
        this.filters.giftContinent = item;
        break;
      }
    }
    if (mobile !== true) {
      this.dataUpdated.emit();
    }
  }

  getItems(): any {
    return this.filters;
  }

  getFiltersByType(type = this.types): any {
    switch (type) {
      case 'continent': {
        return this.filters.continent;
        break;
      }
      case 'typology': {
        return this.filters.typology;
        break;
      }
      case 'giftContinent': {
        return this.filters.giftContinent;
        break;
      }
      case 'giftTypology': {
        return this.filters.giftTypology;
        break;
      }
    }
  }
}
