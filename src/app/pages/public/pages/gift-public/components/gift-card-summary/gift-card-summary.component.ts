import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartInterface} from '../../../../../../_models/cart-interface';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-gift-card-summary',
  templateUrl: './gift-card-summary.component.html',
  styleUrls: ['./gift-card-summary.component.scss']
})
export class GiftCardSummaryComponent extends BaseComponent implements OnInit {
  @Input() item: CartInterface;
  @Output() action = new EventEmitter<string>();
  @Input() type: 'welcomeOnBoard'|'cart' = 'cart';
  showDownloadCard = environment.showDownloadCard;
  cartTypes = CartTypes;
  constructor(
    public cartService: OrderSummaryService,
  ) {
    super();
  }

  ngOnInit(): void {
  }

  actionCard(event): void{
  }

}
