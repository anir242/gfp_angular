import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {CampaignsService} from '../../../../../../_services/public/campaigns.service';
import {Response} from '../../../../../../_models/api/response';
import {CountersPublicInterface} from '../../../../../../_models/api/public/counters-public-interface';
import {CampaignInterface} from '../../../../../../_models/api/public/campaign-interface';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent extends BaseComponent implements OnInit {
  campaignInterface: CampaignInterface[];
  @Output() updated = new EventEmitter<any>();
  @ViewChild('campaignCarousel') campaignCarousel: ElementRef;
  constructor(
    private campaignsService: CampaignsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCampaign().then();
  }

  getCampaign = async () => {
    try {
      const response: Response<CampaignInterface[]> = await this.campaignsService.getCampaigns();
      if (response?.success) {
        this.campaignInterface = response.data;
        this.updated.emit(this.campaignInterface[0].image.url);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  setBg(url: string): any {
    let styles;
    styles = {
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-size': 'cover',
      'background-image': 'url(' + url + ')',
    };
    return styles;
  }

  slider = ($event: TransitionEvent) =>  {
    const items = this.campaignCarousel.nativeElement.getElementsByClassName('carousel-item');
    let i = 0;
    for (let it of items) {
      i++;
      if (i === 3){
        i = 0;
      }
      if (it.classList.contains('active')) {
        this.updated.emit(this.campaignInterface[i].image.url);
      }
    }
  }
  carouselEvent(event): void{
  }

}
