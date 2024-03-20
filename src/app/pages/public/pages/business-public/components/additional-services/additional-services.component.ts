import {Component, ElementRef, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';

@Component({
  selector: 'app-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.scss']
})
export class AdditionalServicesComponent extends BaseComponent implements OnInit {

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }
  getTouch(): void{
    this.scrollToId('footer');
  }
}
