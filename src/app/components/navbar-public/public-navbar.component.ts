import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {RoutingTypes} from '../../_models/components/routing-types';
import {MatSidenav} from '@angular/material/sidenav';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {NavigationEnd} from '@angular/router';
import {StorageName} from '../../_models/components/storage-name';
import {OrderSummaryService} from '../../_services/public/local/order-summary.service';
import {CartTypes} from '../../_models/components/cart-types';
import {LoggedUserService} from '../../_services/public/local/logged-user.service';
import {AuthService} from '../../_services/_base/auth.service';


@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent extends BaseComponent implements OnInit {
  route: string;
  scrollY = 0;
  @Input() menuItemsApp: any[];
  @Output() toggleSidenav = new EventEmitter<void>();
  @ViewChild('menuTrigger') matMenuTrigger: MatMenuTrigger;
  username = '';
  authenticated: boolean = false;
  nElements = 0;
  clientType: string = !!localStorage.getItem('clientType') ? localStorage.getItem('clientType') : 'business';
  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  selectedLang: Language;
  region: string = !!localStorage.getItem('region') ? localStorage.getItem('region') : 'all';
  selectedRegion: Region;
  currency: string = !!localStorage.getItem('currency') ? localStorage.getItem('currency') : 'eur';
  selectedCurrency: Currency;
  windowWidth:any = window.innerWidth
  opened:boolean = false


  constructor(
    // private loggedUserService: LoggedUserService,
    private cartService: OrderSummaryService,
    private auth: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route = this.router.url;
    this.getLocale();
    this.getUsername();
    this.openCart();
    this.closeCart();
    this.setBadge();
    this.setActive();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  isOpened():void{
    this.opened = !this.opened
  }

  setLang(lang): void {
    let currentLang = localStorage.getItem('lang');
    if (currentLang != lang) {
      localStorage.setItem('lang', lang);
      this.changeRoutePath(lang)
      location.reload();
    }
  }

  getLocale(): void {
    this.selectedLang = Language[this.lang];
    this.selectedRegion = Region[this.region];
    this.selectedCurrency = Currency[this.currency];
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
    localStorage.setItem('region', data.region);
    localStorage.setItem('currency', data.currency);
    this.changeRoutePath(data.lang)
    location.reload();
  }

  changeRoutePath(lang: string): void {
    if (this.router.url == '/gestione_impronta_carbonio' && lang === 'en') {
      window.history.pushState({},null,'/carbon_footprint_management')
    } else if (this.router.url == '/carbon_footprint_management' && lang === 'it') {
      window.history.pushState({},null,'/gestione_impronta_carbonio')
    }
  }

  setActive(): void {
    this.menuItemsApp.forEach((item) => {
      switch (item.displayName) {
        case 'home':
          if (this.router.url === '/') {
            item.active = true;
          }
          break;
        case 'projects':
          if (this.router.url === '/projects') {
            item.active = true;
          }
          break;
        default:
          if (this.router.url === item.route) {
            item.active = true;
          }
          break;
      }
      item.children?.forEach((child) => {
        if (this.router.url === child.route || this.router.url === child.route_it) {
          item.active = true;
          child.active = true;
        }
        if(child.displayName == 'blog' && this.lang == 'it'){
          child.route = child.route_it
        }
      })
    });
  }

  store(clientType: ClientTypes): void {
    localStorage.setItem('clientType', clientType);
    if (this.router.url != '/') {
      this.router.navigate([RoutingTypes.HOME_PUBLIC]);
      setTimeout(() => {
        location.reload();
      }, 500)
    } else {
      location.reload()
    }
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

  setBadge(): void {
    this.nElements = this.cartService.getItemsByType(CartTypes.GIFT)?.length;
  }

  openCart(): void {
    this.cartService.dataUpdated.subscribe(data => {
      this.setBadge();
      if (data) {
        this.matMenuTrigger.openMenu();
      }
    });
  }

  closeCart(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.matMenuTrigger.closeMenu();
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  handlerScroll(event): void {
    this.scrollY = event.currentTarget.scrollY;
  }

  login(): void {
    this.router.navigate([RoutingTypes.LOGIN]).then();
  }

  admin(): void {
    this.router.navigate([RoutingTypes.ADMIN]).then();

  }

  setState(event): void {
    this.matMenuTrigger.closeMenu();
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
