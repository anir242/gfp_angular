import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {StorageName} from '../../../../../../_models/components/storage-name';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {CartInterface} from '../../../../../../_models/cart-interface';

@Component({
  selector: 'app-gift-cart-popup',
  templateUrl: './gift-cart-popup.component.html',
  styleUrls: ['./gift-cart-popup.component.scss']
})
export class GiftCartPopupComponent extends BaseComponent implements OnInit {
  @Output() closed = new EventEmitter<boolean>();
  items: CartInterface[] = [];
  cartTypes = CartTypes;
  constructor(
    public cartService: OrderSummaryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void{
    this.cartService.dataUpdated.subscribe(() => {
      this.items = this.cartService.getItemsByType(CartTypes.GIFT);
    });
    this.items = this.cartService.getItemsByType(CartTypes.GIFT);
  }

  goToCart(): void{
    this.router.navigate([RoutingTypes.CART]).then();
  }
  goToCheckOut(): void{
    this.router.navigate([RoutingTypes.CHECK_OUT]).then();
  }
}
