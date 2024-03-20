import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-cart-summary-data',
  templateUrl: './gift-cart-summary-data.component.html',
  styleUrls: ['./gift-cart-summary-data.component.scss']
})
export class GiftCartSummaryDataComponent extends BaseComponent implements OnInit {
  @Output() action = new EventEmitter<string>();
  @Input() value1: number[];
  @Input() co2: number;
  @Input() recipientName: string;
  @Input() recipientEmail: string;
  @Input() occasion: string;
  @Input() firstTitle: string;
  @Input() deliveryDate: Date;
  @Input() message: string;
  @Input() unitSlug: string;
  @Input() price: number;


  constructor() {
    super();
  }

  ngOnInit(): void{}

}
