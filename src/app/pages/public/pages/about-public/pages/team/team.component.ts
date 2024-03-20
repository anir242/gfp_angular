import {AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {TeamInterface} from '../../../../../../_models/api/public/team-interface';
import {TeamService} from '../../../../../../_services/public/team.service';
import {Response} from '../../../../../../_models/api/response';
import {ActivatedRoute} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {environment} from '../../../../../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input() showTitle: boolean = true;
  team = 'https://green-future-project.s3.eu-central-1.amazonaws.com/about_team_bg_bdd78a7d-d52f-4a3c-bbe3-e205baf869dd';
  teamInterface: TeamInterface[];
  ambassadorInterface: TeamInterface[];
  teamType: boolean;
  fragment: string;
  buttonText: string;
  showJoin = environment.showJoinTeam;
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private viewportScroller: ViewportScroller
  ) {
    super();
  }

  ngOnInit(): void {
    this.setText();
    this.route.fragment.subscribe(fragment => {this.fragment = fragment; });
    this.getTeam().then();
  }

  setText(): void{
    if (environment.showJoinTeam){
      this.buttonText = this.translate.instant('aboutPublicTeam.join');
    }
  }
  ngAfterViewInit(): void {
  }

  getTeam = async () => {
    const params: any = {};
    try {
      const response: Response<TeamInterface[]> = await this.teamService.getTeam(params);
      if (response?.success) {
        this.teamInterface = response.data.filter(it => it.creator);
        this.ambassadorInterface = response.data.filter(it => !it.creator);
        if (this.fragment){
          setTimeout(() => {
            this.scrollToId('join');
          }, 0);
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
