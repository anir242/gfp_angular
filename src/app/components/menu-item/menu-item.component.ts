import {Component, EventEmitter, HostBinding, Input, OnInit, Output, Inject, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItem} from '../../_models/components/nav-item';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {LoggedUserService} from '../../_services/public/local/logged-user.service';
import {AuthService} from '../../_services/_base/auth.service';
import { PilioModalComponent } from '../pilio-modal/pilio-modal.component';
import { StorageName } from 'src/app/_models/components/storage-name';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {Response} from '../../_models/api/response';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuItemComponent extends BaseComponent implements OnInit {
  expanded = false;
  rippleState: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() menuItemsGen: NavItem[];
  @Input() route = '';
  @Input() depth: number;
  @Output() toggleItemSidenav = new EventEmitter<void>();
  username: string;
  authenticated: boolean = false;
  pilio: boolean = false;
  firstPilioAccess: boolean = true;
  openWrong: boolean = false;
  windowWidth:any = window.innerWidth
  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';



  constructor(
    public router: Router,
    private auth: AuthService,
    private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) private document: Document
    // private loggedUserService: LoggedUserService,
) {
    super();
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {
    this.getUsername();
    this.assignState();
    const pilio = localStorage.getItem(StorageName.pilio);
    if (pilio) {
      if (Number(pilio)) {
        this.pilio = true;
      }
    }
    const pilioLastAccess = localStorage.getItem(StorageName.pilioLastAccess);
    if (pilioLastAccess && pilioLastAccess !== 'undefined') {
      this.firstPilioAccess = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;   
  }

   assignState(): boolean{
    this.rippleState = this.item.enable === false;
    return this.rippleState;
  }

  async onItemSelected(item: NavItem): Promise<void> {
    if (!item.children || !item.children.length) {
      if (window.innerWidth < 991) {
        this.ItemSidenav.emit();
      }

      if(item.displayName == 'blog'){
          this.lang == 'it' ? window.open(item.route_it) : window.open(item.route)
          location.reload()
      }else{
        let route = '/';
        if (item.route) {
          if(this.lang == 'it' && item.route_it){
          route = this.route + item.route_it
          }else{
            route = this.route + item.route
          }
          setTimeout(() => {
              location.reload()
          }, 500);
        }
        if (item.store) {
          localStorage.setItem('clientType', item.store.toString());
        }
        if (this.router.url == '/' && route == '/') {
          location.reload();
        } else {
          await this.router.navigate([route]);
          if (route == '/') {
            setTimeout(() => {
              location.reload();
            }, 500)
          }
        }
      }
    }
    if (item.children && item.children.length) {
      this.menuItemsGen.map((item)=>{
        if(item.displayName !== this.item.displayName){
          item.expanded = false
        }
      });
      this.item.expanded = !this.item.expanded;
      window.dispatchEvent(new Event('resize'));
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

  open(): void {
    const wrongInfo = document.getElementById('wrong-info');
    wrongInfo.classList.remove('d-none');
  }

  close(event): void {
    event.stopPropagation();
    const wrongInfo = document.getElementById('wrong-info');
    wrongInfo.classList.add('d-none');
  }  

  toggle():void {
    console.log(this.menuItemsGen)
  }
  openPilioDialog = async () => {
    if (this.pilio) {
      if (this.firstPilioAccess) {
        this.dialog.open(PilioModalComponent);
      } else {
        // navigate to Pilio
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const email = JSON.parse(userData).email;
            if (email) {
              const response: Response<any> = await this.authenticationService.loginPilio(email);
              if (response?.success) {
                const token = response.data.token;
                if (token) {
                  this.document.location.href = environment.pilioLoginUrl + '?magic_token=' + token;
                }
              } else {
                this.showErrorResponse(response);
              }
            }
          }
        } catch (e) {
          this.showErrorResponse(e);
        } 
      }
    } else {
      const wrongInfo = this.document.getElementById('wrong-info');
      wrongInfo.classList.remove('d-none');
    }
  }
}
