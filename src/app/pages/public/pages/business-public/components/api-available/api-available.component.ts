import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { RoutingTypes } from '../../../../../../_models/components/routing-types';

@Component({
  selector: 'app-api-available',
  templateUrl: './api-available.component.html',
  styleUrls: ['./api-available.component.scss']
})
export class ApiAvailableComponent implements OnInit {
  showApi = environment.showApi;
  routingTypes = RoutingTypes;
  constructor() { }

  ngOnInit(): void {
  }

}
