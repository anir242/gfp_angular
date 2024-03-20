import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { TeamInterface } from 'src/app/_models/api/public/team-interface';
import { TeamService } from 'src/app/_services/public/team.service';
import {Response} from '../../../../../../_models/api/response';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {

  isMobile: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  teamInterface: TeamInterface[];
  isTeamPage: boolean = true;
  ambassadorInterface: TeamInterface[];
  teamType: boolean;
  fragment: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private teamService: TeamService,
  ) { super() }

    ngOnInit(): void {
      this.getTeam();
      this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
      this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 991px)');
      this.isMediumScreen = this.breakpointObserver.isMatched('(max-width: 1199px)');
    }

    setLang(): void {
      const selectedLang = localStorage.getItem('lang')
      if (selectedLang === 'it') {
        this.teamInterface.forEach(item => {
          item.description = item.description_it
        })
        this.ambassadorInterface.forEach(item => {
          item.description = item.description_it
        })

      } else if (selectedLang === 'jp') {
        this.teamInterface.forEach(item => {
          item.description = item.description_jp
        })
        this.ambassadorInterface.forEach(item => {
          item.description = item.description_jp
        })
      }
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
          this.setLang()
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
    }
}
