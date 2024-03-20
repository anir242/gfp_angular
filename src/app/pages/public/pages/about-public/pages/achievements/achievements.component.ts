import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent extends BaseComponent implements OnInit {
  urlAchievements = 'https://green-future-project.s3.eu-central-1.amazonaws.com/about_achievements_50656f79-0d3a-49ec-bace-99fdd4925de9';
  urlFuture = 'https://green-future-project.s3.eu-central-1.amazonaws.com/future_achievements_9167a996-3de2-4f21-8097-096630f6a8fe'
  buttonText: string;
  images = [
    {path: 'https://green-future-project.s3.eu-central-1.amazonaws.com/goldStandard_221c9536-470b-4f60-aac1-65438b05b24f'},
    {path: 'https://green-future-project.s3.eu-central-1.amazonaws.com/vcs_7e4fcc8a-4ac3-4628-a246-b6619d2a9aa1'},
    {path: 'https://green-future-project.s3.eu-central-1.amazonaws.com/goals_9704e33a-5c53-4d8a-b4f8-a851673050f7'}];
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setText();
  }
  joinGfp(): void{
    this.router.navigate([RoutingTypes.TEAM], {fragment: 'join'}).then();
  }
  setText(): void{
    if (environment.showJoinTeam){
      this.buttonText = this.translate.instant('aboutPublicTeam.join');
    }
  }
}
