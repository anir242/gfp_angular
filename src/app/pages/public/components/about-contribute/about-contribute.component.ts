import {Component, Input, OnInit} from '@angular/core';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-about-contribute',
  templateUrl: './about-contribute.component.html',
  styleUrls: ['./about-contribute.component.scss']
})
export class AboutContributeComponent implements OnInit {
  routingTypes = RoutingTypes;
  constructor() { }

  ngOnInit(): void {
  }

}
