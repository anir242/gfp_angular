import { Component, OnInit } from '@angular/core';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-shape-future',
  templateUrl: './shape-future.component.html',
  styleUrls: ['./shape-future.component.scss']
})
export class ShapeFutureComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  signUp(): void{
    this.router.navigate([RoutingTypes.SUBSCRIPTIONS]);

  }
}
