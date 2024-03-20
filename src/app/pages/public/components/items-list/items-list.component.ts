import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent extends BaseComponent implements OnInit {
  items = [
    {
      url: 'assets/images/svg/plantCircle.svg',
      title: this.translate.instant('aboutPublic.goal'),
      description: this.translate.instant('aboutPublic.goalDescription')
    },
    {
      url: 'assets/images/svg/mountain.svg',
      title: this.translate.instant('aboutPublic.mission'),
      description: this.translate.instant('aboutPublic.missionDescription')
    },
    {
      url: 'assets/images/svg/eye.svg',
      title: this.translate.instant('aboutPublic.vision'),
      description: this.translate.instant('aboutPublic.visionDescription')
    },
  ];
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
