import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './navbar-auth.component.html',
  styleUrls: ['./navbar-auth.component.scss']
})
export class NavbarAuthComponent extends BaseComponent implements OnInit {
  route: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.route = this.router.url;
  }

}
