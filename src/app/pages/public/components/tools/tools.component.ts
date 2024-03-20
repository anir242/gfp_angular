import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent extends BaseComponent implements OnInit {
  tools = [
    {
      title: this.translate.instant('landingPublicTools.explore'),
      description: this.translate.instant('landingPublicTools.among'),
      url: 'assets/images/svg/progress_map.svg'
    },
    {
      title: this.translate.instant('landingPublicTools.track'),
      description: this.translate.instant('landingPublicTools.through'),
      url: 'assets/images/svg/window_browser.svg'
    },
    {
      title: this.translate.instant('landingPublicTools.monthly'),
      description: this.translate.instant('landingPublicTools.translate'),
      url: 'assets/images/svg/task.svg'
    },
    {
      title: this.translate.instant('landingPublicTools.support'),
      description: this.translate.instant('landingPublicTools.all'),
      url: 'assets/images/svg/plant.svg'
    }
  ];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
