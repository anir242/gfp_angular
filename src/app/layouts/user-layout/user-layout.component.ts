import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UsersInterface } from '../../_models/api/users/users-interface';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { StorageName } from '../../_models/components/storage-name';
import { Response } from '../../_models/api/response';
import { BaseComponent } from '../../pages/_base/base/base.component';
import { UsersService } from '../../_services/users/users.service';
import { NavItem } from '../../_models/components/nav-item';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent extends BaseComponent implements OnInit {
  user: UsersInterface;
  mode: MatDrawerMode = 'side';
  toggleOpen = true;
  @ViewChild('sidenav') sidenav: MatSidenav;
  menuItems: NavItem[];
  menuItemsApp: NavItem[];
  start: boolean = true;

  navTabItems = [
    {
      label: "settings.tabsGroup.accountAndBillings",
      route: "/admin/users/accountBilling",
      active: false
    },
    {
      label: "settings.tabsGroup.subscription",
      route: "/admin/users/subscriptions",
      active: false
    },
    {
      label: "settings.tabsGroup.singleContributions",
      route: "/admin/users/singlePayments",
      active: false
    },
    {
      label: "settings.tabsGroup.notificationsAndCommunications",
      route: "/admin/users/", //missing route?
      active: false
    },
    {
      label: "settings.tabsGroup.privacyPolicy",
      route: "/admin/users/privacyPolicy",
      active: false
    },
  ]

  constructor(
    private usersService: UsersService,
    protected router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getUserInfo().then();
    this.onResize();
    this.navTabItems.map((item) => {
      item.active = this.router.url == item.route;
      return item;
    })
  }

  setActiveItem(index) {
    this.navTabItems.map((item, i) => {
      item.active = index == i;
      return item;
    })
  }

  hideNav(): void {
    if (this.start) {
      this.start = false;
    } else {
      const navbar = document.querySelector('.mat-toolbar')
      navbar.classList.add('hidden');
    }
  }

  showNav(): void {
    const navbar = document.querySelector('.mat-toolbar')
    navbar.classList.remove('hidden');
  }

  onResize(event?): any {
    this.mode = window.innerWidth > 768 ? 'side' : 'over';
    if (window.innerWidth > 768) {
      this.sidenav?.open().then(r => {
        this.showNav();
      });
    } else {
      this.sidenav?.close().then(r => { });
    }
  }

  getUserInfo = async () => {
    const userId = localStorage.getItem(StorageName.id);
    try {
      const response: Response<UsersInterface> = await this.usersService.getUserById(userId);
      if (response?.success) {
        this.user = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }
}