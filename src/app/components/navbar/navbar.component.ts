import { HostListener } from '@angular/core';
import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {RoutingTypes} from '../../_models/components/routing-types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent implements OnInit {
  private listTitles: any[];
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() firstname: string;
  @Input() lastname: string;
  private toggleButton: any;
  public isCollapsed = true;
  @Input() tabColor: string;
  @Input() imgUrl: string;
  routingTypes = RoutingTypes;
  scrollY = 0;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.listTitles = this.sidebarProfile.filter(listTitle => listTitle);
  }

  getTitle = (): string => {
    let titlee = this.router.url;
    if (titlee.charAt(0) === '#' || titlee.charAt(0) === '/') {
      titlee = titlee.slice(1);
    }
    const title = this.getTitleNavbar(this.listTitles, titlee);
    if (title === '') {
      return this.translate.instant('sidebar.dashboard');
    } else {
      return title;
    }
  };
  getTitleNavbar = (listTitles: any[], titlee: string): string => {
    for (const item of listTitles) {
      if (item.route === titlee) {
        return this.translate.instant('sidebar.' + item.displayName);
      }
      if (item.children) {
        const val = this.getTitleNavbar(item.children, titlee);
        if (val !== '') {
          return val;
        }
      }
    }
    return '';
  }

  sidebarOpen(): any {
    if (this.toggleSidenav.closed) {
      this.toggleSidenav.emit();
    }
  }

  setLang(lang): void {
    let currentLang = localStorage.getItem('lang');
    if (currentLang != lang) {
      localStorage.setItem('lang', lang);
      location.reload();
    }
  }

  sidebarClose(): any {
    if (!this.toggleSidenav.closed) {
      this.toggleSidenav.emit();
    }
  }

  @HostListener('window:scroll', ['$event'])
  handlerScroll(event): void {
    this.scrollY = event.currentTarget.scrollY;
  }
}
