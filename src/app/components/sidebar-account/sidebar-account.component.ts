import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';


import {BaseComponent} from '../../pages/_base/base/base.component';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterEvent, RouterStateSnapshot} from '@angular/router';
import {StorageName} from '../../_models/components/storage-name';
import {RoutingTypes} from '../../_models/components/routing-types';

@Component({
  selector: 'app-sidebar-account',
  templateUrl: './sidebar-account.component.html',
  styleUrls: ['./sidebar-account.component.scss']
})
export class SidebarAccountComponent extends BaseComponent implements OnInit {
  @Input() menuItemsGen: any[];
  @Input() menuItemsApp: any[];
  @Output() toggleSidenav = new EventEmitter<void>();
  login = RoutingTypes.LOGIN;

  constructor(
    private route: ActivatedRoute
  ) {
    super();
  }

  urlChanged(value: any): void {
    if (value?.url != null) {
      if (value?.url?.indexOf(RoutingTypes.ADMIN_SUBSCRIPTIONS + '/') > -1) {
        this.menuItemsGen = this.sidebarSubscription;
      } else {
        this.menuItemsGen = this.sidebarProfile;
        this.sharedService.subscriptionId = undefined;
        localStorage.removeItem(StorageName.subscriptionId);
      }
    }
  }

  ngOnInit(): void {
    super.ngOnInit(); 
    this.router.events.subscribe(((value: RouterEvent) => {
      this.urlChanged(value);
    }));
    if (this.router?.url?.indexOf(RoutingTypes.ADMIN_SUBSCRIPTIONS + '/') > -1) {
      this.menuItemsGen = this.sidebarSubscription;
    }
  }
}
