import {Component, OnInit} from '@angular/core';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {BaseComponent} from '../../../_base/base/base.component';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent extends BaseComponent implements OnInit {
  buttonText: string;

  constructor() {
    super();
  }


  ngOnInit(): void {
    this.setText();
  }

  joinGfp(): void {
    this.router.navigate([RoutingTypes.SUBSCRIPTIONS]).then();
  }

  setText(): void {
    if (environment.showJoinTeam) {
      this.buttonText = this.translate.instant('aboutPublic.join');
    }
  }
  setBackground(img: string): any {
    return {
      'background-image': `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%'
    };
  }
}
