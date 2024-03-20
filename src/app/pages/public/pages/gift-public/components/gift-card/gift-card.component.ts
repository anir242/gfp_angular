import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.scss']
})
export class GiftCardComponent extends BaseComponent implements OnInit {
  @Input() cardId: string;
  @Input() url: string;
  @Input() location: string[];
  @Input() title: string;
  @Input() description: string;
  @Input() price: number;
  @Input() color: string;
  @Input() projectType: string;
  @Input() selectGift?: (id: string) => any;

  constructor() {
    super();
  }
  ngOnInit(): void {
  }
}
