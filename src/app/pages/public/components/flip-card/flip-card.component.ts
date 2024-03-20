import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent extends BaseComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() caption: string;
  @Input() type: string;
  @Input() cardType: 'small' | 'large' = 'small';
  @ViewChild('card') card: ElementRef;
  @Input() business: boolean;

  toggleProperty = false;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
