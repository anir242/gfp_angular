import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-hotspot-popup',
  templateUrl: './hotspot-popup.component.html',
  styleUrls: ['./hotspot-popup.component.scss'],
})

export class HotspotPopupComponent extends BaseComponent implements OnInit {

  @Input() backgroundType: string;
  @Input() slugProject: string;
  @Input() nameProject: string;
  @Input() typeProject: string;
  @Input() imageProject: string;
  @Input() isDashboardHome: boolean | undefined;
  constructor(
) {
    super();
  }

  ngOnInit(): void {
  }

  openProject = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug]);
  }

  openLive = async (slug: string): Promise<void> => {
    this.isDashboardHome ? await this.router.navigate(['projects', slug, 'live']) : await this.router.navigate(['projects', slug]);
  }

}
