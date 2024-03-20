import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItem} from '../../_models/components/nav-item';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {LoggedUserService} from '../../_services/public/local/logged-user.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
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
export class InfoComponent extends BaseComponent implements OnInit {
  visible = false;
  bubble: any;
  @Input() icon: string = 'assets/images/icons/tooltip.svg';
  @Input() selector: string = 'default';
  @Input() theme: string = 'dark';
  @Input() title: string;
  @Input() body: string;
  @Input() link: string;
  @Input() positionX: string = 'right';
  @Input() positionY: string = 'top';
  @Input() invert: string;

  username: string;

  constructor(
    public router: Router,
) {
    super();
  }

  ngOnInit(): void {
    this.bubble = document.getElementById('info-bubble-' + this.selector);
    this.setSize();
  }

  setSize() {
    if (window.innerWidth < 1000) {
      this.positionX = 'left';
      // this.positionY = 'bottom';
    }
  }

  onResize(event) {
    this.setSize();
  }

  show(): void {
    this.visible = true;
    this.bubble?.classList.add('visible');
  }

  hide(): void {
    this.visible = false;
    this.bubble?.classList.remove('visible');
  }

  display(): boolean {
    this.bubble = document.getElementById('info-bubble-' + this.selector)
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
    return this.visible;
  }

  goToLink = async () => {
    if (this.link) {
      await this.router.navigate([this.link]);
    }
  }
}
