import { Component, OnInit } from '@angular/core';
import {ProgressTypes} from '../../../../_models/components/progress-types';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent extends BaseComponent implements OnInit {
  progressTypes = ProgressTypes;
  items = [{text: this.translate.instant('landingPublicProgress.you'), url: 'assets/images/svg/gfp_user.svg'},
    {text: this.translate.instant('landingPublicProgress.gfp'), url: 'assets/images/svg/gfp_logo_circle.svg'},
    {text: this.translate.instant('landingPublicProgress.future'), url: 'assets/images/svg/trees_circle.svg'}];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
