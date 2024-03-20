import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  NavigationStart,
  RouterEvent,
  RouterStateSnapshot
} from '@angular/router';
import {StorageName} from '../../_models/components/storage-name';
import {RoutingTypes} from '../../_models/components/routing-types';
import {LoggedUserService} from '../../_services/public/local/logged-user.service';
import {AuthService} from '../../_services/_base/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  year: number = new Date().getFullYear();
  @Input() menuItemsGen: any[];
  @Input() menuItemsApp: any[];
  @Output() toggleSidenav = new EventEmitter<void>();
  routingTypes = RoutingTypes;
  authenticated: boolean = false;
  username = '';
  settingsView = false;
  subscriptionView = false;
  publicView = false;
  clientType: string = !!localStorage.getItem('clientType') ? localStorage.getItem('clientType') : 'business';
  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  selectedRegion: Region;
  selectedCurrency: Currency;
  selectedLang: Language;
  currency: string = !!localStorage.getItem('currency') ? localStorage.getItem('currency') : 'eur';
  region: string = !!localStorage.getItem('region') ? localStorage.getItem('region') : 'all';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    super();
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart){

      }
    });
  }

  urlChanged(value: any): void {
    if (value?.url != null) {
      if (value?.url?.indexOf(RoutingTypes.ADMIN_SUBSCRIPTIONS + '/') > -1) {
        //this.menuItemsGen = this.sidebarSubscription;
      } else {
        this.sharedService.subscriptionId = undefined;
        localStorage.removeItem(StorageName.subscriptionId);
      }
      this.subscriptionView = value?.url?.startsWith('/admin/users/subscriptions/');
      this.settingsView = value?.url?.startsWith('/admin/users') && !this.subscriptionView;
    }
  }

  ngOnInit(): void {
    this. getLocale();
    this.getUsername();
    this.router.events.subscribe(((value: RouterEvent) => {
      this.urlChanged(value);
    }));
    if (this.router?.url?.indexOf(RoutingTypes.ADMIN_SUBSCRIPTIONS + '/') > -1) {
      //this.menuItemsGen = this.sidebarSubscription;
    } else {
      this.sharedService.subscriptionId = undefined;
      localStorage.removeItem(StorageName.subscriptionId);
    }
    this.subscriptionView = this.router?.url?.startsWith('/admin/users/subscriptions/');
    this.settingsView = this.router?.url?.startsWith('/admin/users') && !this.subscriptionView;
    this.publicView  = !this.router?.url?.startsWith('/admin') && !this.subscriptionView && !this.settingsView;
    if (this.publicView) {
      this.menuItemsGen?.forEach((item) => {
        item.children?.forEach((child) => {
          if (child.type && child.type != this.clientType) {
            child.visible = false;
          }
        });
      });
    }
   
  }

  getLocale(): void {
    this.selectedLang = Language[this.lang];
    this.selectedRegion = Region[this.region];
    this.selectedCurrency = Currency[this.currency];
  }

  getUsername(): void {
    this.loggedUserService.logged.subscribe(() => {
      this.username = this.loggedUserService.getUsername();
    })
    this.username = this.loggedUserService.getUsername();
    if (this.auth.isAuthenticated()) {
      this.authenticated = true;
      if (!this.username) {
        this.username = this.translate.instant('landingPublic.menu.access');
      }
    }
  }

  openLocaleModal(): void {
    this.openLocale(
      this.translate.instant('locale.title'),
      'large',
      this.translate.instant('locale.language'),
      '',
      true,
      (result) => this.setLocale(result),
      'Yes'
    );
  }

  setLocale(data): void {
    localStorage.setItem('lang', data.lang);
    if (this.router.url == '/gestione_impronta_carbonio' && data.lang === 'en') {
      window.history.pushState({},null,'/carbon_footprint_management')
    } else if (this.router.url == '/carbon_footprint_management' && data.lang === 'it') {
      window.history.pushState({},null,'/gestione_impronta_carbonio')
    }
    localStorage.setItem('region', data.region);
    localStorage.setItem('currency', data.currency);
    location.reload();
  }
}


enum Language {
  "en" = 'en',
  "it" = 'it'
  // "jp" = 'jp'
}

enum Region {
  "all" = 'Global',
  "eu" = 'Europe',
  "mena" = "Middle East",
  "na" = "North America",
  "sa" = "South America",
  "asia" = "Asia Pacific"
}

enum Currency {
  "($) USD" = 'usd',
  "(€) EUR" = 'eur',
  usd = "($) USD",
  eur = "(€) EUR"
}