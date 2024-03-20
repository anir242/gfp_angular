import {Component, OnInit} from '@angular/core';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {GiftEditComponent} from '../../../../dialogs/gift-edit/gift-edit.component';
import {StorageName} from '../../../../../../_models/components/storage-name';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {CartInterface} from '../../../../../../_models/cart-interface';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-cart.component.html',
  styleUrls: ['./gift-cart.component.scss']
})
export class GiftCartComponent extends BaseComponent implements OnInit {
  items: CartInterface[] = [];

  constructor(
    private cartService: OrderSummaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getItems();
    this.itemsNotNull();
  }

  itemsNotNull(): void {
    if (this.items.length === 0) {
      this.router.navigate([RoutingTypes.GIFT]);
    }
  }

  getItems(): void {
    this.cartService.dataUpdated.subscribe(() => {
      this.items = this.cartService.getItemsByType(CartTypes.GIFT);
    });
    this.items = this.cartService.getItemsByType(CartTypes.GIFT);
  }

  action(item: CartInterface, event: any): void {
    this.items = this.cartService.getItemsByType(CartTypes.GIFT);
    switch (event) {
      case 'delete': {
        this.cartService.deleteItem(item);
        break;
      }
      default: {
        let singleItem: CartInterface;
        this.items.forEach(x => {
          if (JSON.stringify(x) === JSON.stringify(item)){
             singleItem = x;
          }
        });
        // const singleItem: CartInterface = this.items.filter(x => x === item)[0];
        const dialog = this.dialog.open(GiftEditComponent, {data: singleItem, width: '90%', height: '80%', panelClass: 'noPadding'});
        dialog.afterClosed().subscribe(() => {
          this.items = this.cartService.getItemsByType(CartTypes.GIFT);
        });
        break;
      }
    }
  }

  goToCheckOut(): void {
    this.router.navigate([RoutingTypes.CHECK_OUT]);
  }

  goToGifts(): void {
    this.router.navigate([RoutingTypes.GIFT]);
  }

}
