import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-impact-explained',
  templateUrl: './impact-explained.component.html',
  styleUrls: ['./impact-explained.component.scss']
})
export class ImpactExplainedComponent extends BaseComponent implements OnInit {
  items = [
    {
      title: this.translate.instant('aboutPublic.restore'),
      description: this.translate.instant('aboutPublic.restoreDescription')
    },
    {
      title: this.translate.instant('aboutPublic.support'),
      description: this.translate.instant('aboutPublic.supportDescription')
    },
    {
      title: this.translate.instant('aboutPublic.offset'),
      description: this.translate.instant('aboutPublic.offsetDescription')
    },
  ];
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
