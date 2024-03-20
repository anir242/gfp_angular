import { Component, OnInit } from '@angular/core';
import {RoutingTypes} from '../../_models/components/routing-types';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-footer-authentication',
  templateUrl: './footer-authentication.component.html',
  styleUrls: ['./footer-authentication.component.scss']
})
export class FooterAuthenticationComponent extends BaseComponent implements OnInit {
  year: number = new Date().getFullYear();
  routingTypes = RoutingTypes;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  goTo(url: string): void{
    this.router.navigate([url]);
  }
}
