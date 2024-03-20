import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {CampaignsService} from '../../../../_services/public/campaigns.service';
import {Response} from '../../../../_models/api/response';
import {CountersPublicInterface} from '../../../../_models/api/public/counters-public-interface';
import {CampaignInterface} from '../../../../_models/api/public/campaign-interface';
import {BreakpointObserver} from '@angular/cdk/layout';
import { PartnersPublicService } from 'src/app/pages/public/pages/partners-public/partners-public.service';

@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent extends BaseComponent implements OnInit {
  campaignInterface: CampaignInterface[];
  @Output() updated = new EventEmitter<any>();
  @ViewChild('campaignCarousel') campaignCarousel: ElementRef;
  partners;
  data = [
    {
      title: 'landingPublicCaseStudies.emobility',
      selected: true
    },
    {
      title: 'landingPublicCaseStudies.f&b',
      selected: false
    },
    {
      title: 'landingPublicCaseStudies.motorsport',
      selected: false
    },
    {
      title: 'landingPublicCaseStudies.fashion',
      selected: false
    },
  ]

  constructor(
    private campaignsService: CampaignsService,
    private partnersPublicService: PartnersPublicService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getData().then();
    this.getCampaign().then();
  }

  async getData() {
    let response:Response<any> = (await this.partnersPublicService.getPublicPartners());
    this.partners = response.data.filter((el:any)=> el.type == 'partners');    
  }

  setLang(): void {
    if (localStorage.getItem('lang') == 'it') {
      this.campaignInterface?.forEach((campaign) => {
        campaign.title = campaign.title_it;
        campaign.campaignBrief = campaign.campaignBrief_it;
        campaign.theme = campaign.theme_it;
        campaign.impact = campaign.impact_it;
        campaign.activation = campaign.activation_it;
        campaign.activationDescription = campaign.activationDescription_it;
      });
    }
  }

  getCampaign = async () => {
    try {
      const response: Response<CampaignInterface[]> = await this.campaignsService.getCampaigns();
      if (response?.success) {
        this.campaignInterface = response.data;
        this.updated.emit(this.campaignInterface[0].image.url);
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }



}
