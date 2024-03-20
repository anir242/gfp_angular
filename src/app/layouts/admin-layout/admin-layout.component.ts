import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Navigation, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {UsersService} from '../../_services/users/users.service';
import {StorageName} from '../../_models/components/storage-name';
import {Response} from '../../_models/api/response';
import {UsersInterface} from '../../_models/api/users/users-interface';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {CompanyEmployeesInterface} from '../../_models/api/companies/company-employees-interface';
import {CompanyEmployeesService} from '../../_services/companies/company-employees.service';
import {NavItem} from '../../_models/components/nav-item';
import { RoutingTypes } from '../../_models/components/routing-types';
import { ScriptService } from '../../_services/script.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  mode: MatDrawerMode = window.innerWidth >= 768 ? 'side' : 'over';;
  toggleOpen = window.innerWidth >= 768;
  user: UsersInterface;
  userCompanyRole: string;
  colorNavbar = '';
  companyEmployee: CompanyEmployeesInterface;
  menuItems: NavItem[];
  menuItemsApp: NavItem[];
  menuItemsSubscription: NavItem[];
  start: boolean = true;

  constructor(
    private companyEmployeesService: CompanyEmployeesService,
    private usersService: UsersService,
    public route: ActivatedRoute,
    private scriptService: ScriptService
  ) {
    super();
    this.setNavbarColor().then();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getUserInfo().then();
    this.getUserRole().then();
    this.menuItemsApp = this.sidebarApp;
    this.menuItems = this.sidebarApp;
    /*if (this.router?.url?.startsWith('/admin/users/subscriptions/')) {
      this.menuItems = this.sidebarSubscription;
    } else {
      this.menuItems = this.sidebarProfile;
    }*/
    this.router.events.subscribe(((value: RouterEvent) => {
      this.urlChanged(value);
    }));
    this.onResize();
    this.hideNav();
    //this.scriptService.load('googleTranslateInit', 'googleTranslate').then(data => {}).catch(error => console.log(error));
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

  urlChanged(value: any): void {
    if (value?.url != null) {
      if (value?.url?.indexOf(RoutingTypes.ADMIN_SUBSCRIPTIONS + '/') > -1) {
        this.menuItems = this.sidebarSubscription;
      } else {
        this.menuItems = this.sidebarProfile;
      }
    }
  }

  setNavbarColor = async () => {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.colorNavbar = '';
        if (this.router.url === '/admin/projects') {
          // this.colorNavbar = 'dark';
        }
      }
    });
  }

  ngAfterViewInit(): void {
  }

  onResize(event?): any {
    if (window.innerWidth >= 768) {
      this.mode = 'side';
      this.sidenav?.open().then(r => {
        this.showNav();
      });
    } else {
      this.mode = 'over';
      this.sidenav?.close();
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

  getUserRole = async () => {
    const userId = localStorage.getItem(StorageName.id);
    try {
      const response: Response<CompanyEmployeesInterface> = await this.companyEmployeesService.getCompanyEmployeeById(userId);
      if (response?.success) {
        this.companyEmployee = response.data;
        if (this.companyEmployee) {
          this.userCompanyRole = this.companyEmployee?.role?.slug;
          localStorage.setItem(StorageName.companyId, this.companyEmployee.companyId);
          localStorage.setItem(StorageName.userCompanyRole, this.userCompanyRole);
          // set Pilio local storage value
          const company = this.companyEmployee.company;
          if (company) {
            if (company.pilio) {
              localStorage.setItem(StorageName.pilio, this.companyEmployee.company.pilio.toString());
            }
          }
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
