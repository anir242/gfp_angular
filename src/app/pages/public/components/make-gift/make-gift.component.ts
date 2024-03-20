import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-make-gift',
  templateUrl: './make-gift.component.html',
  styleUrls: ['./make-gift.component.scss']
})
export class MakeGiftComponent extends BaseComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() button?: string;
  @Input() buttonAction: () => any;
  @Input() disabledButton = false;

  constructor() {
    super();
  }


  ngOnInit(): void {
  }

}

