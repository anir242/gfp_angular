import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDrawerMode, MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  mode: MatDrawerMode = 'over';
  toggleOpen = false;
  colorNavbar = '';
  menuItems: any[];

  constructor(
    public route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.mode = window.innerWidth > 768 ? 'over' : 'over';
    this.menuItems = this.menuPublic;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.toggleOpen = false; // window.innerWidth > 768;
    }, 0);
    this.mode = window.innerWidth > 768 ? 'over' : 'over';
  }

  onResize(event): any {
    if (window.innerWidth > 768){
      this.sidenav.close();
    }
    this.mode = window.innerWidth > 768 ? 'over' : 'over';
  }

}
