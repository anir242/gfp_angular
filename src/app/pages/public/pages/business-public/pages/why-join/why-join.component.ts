import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {translate} from '@angular/localize/tools';
import {ProgressTypes} from '../../../../../../_models/components/progress-types';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {environment} from '../../../../../../../environments/environment';
import {Response} from '../../../../../../_models/api/response';
import {ProjectsPartnersInterface} from '../../../../../../_models/api/projects/projects-partners-interface';
import {PartnersPublicService} from '../../../../../../_services/public/partners.public.service';
import {FaqInterface} from '../../../../../../_models/api/public/faq/faq-interface';
import {FaqService} from '../../../../../../_services/public/faq.service';
import { SingleFaqInterface } from '../../../../../../_models/api/public/faq/single-faq-interface';
import { CalendlyPopupComponent } from '../../../../../public/components/calendly-popup/calendly-popup.component';


@Component({
  selector: 'app-why-join',
  templateUrl: './why-join.component.html',
  styleUrls: ['./why-join.component.scss']
})
export class WhyJoinComponent extends BaseComponent implements OnInit {
  urlWhyJoin = 'https://green-future-project.s3.eu-central-1.amazonaws.com/whyJoinBg_8257a6ac-35d8-4bd9-b029-976292a42303';
  urlReadyJoin = 'https://green-future-project.s3.eu-central-1.amazonaws.com/readyJoin_786c28f0-41bc-4757-a284-40898f4413b3';
  urlApi = 'https://green-future-project.s3.eu-central-1.amazonaws.com/apiBg_fff68fd1-1a00-462e-a900-6bb946047292';
  cardQualities = [
    {url: 'assets/images/svg/foot.svg', title: this.translate.instant('whyJoin.cardTitle1'), description: this.translate.instant('whyJoin.cardDescription1')},
    {url: 'assets/images/svg/monitor.svg', title: this.translate.instant('whyJoin.cardTitle2'), description: this.translate.instant('whyJoin.cardDescription2')},
    {url: 'assets/images/svg/plant.svg', title: this.translate.instant('whyJoin.cardTitle3'), description: this.translate.instant('whyJoin.cardDescription3')},
    {url: 'assets/images/svg/man.svg', title: this.translate.instant('whyJoin.cardTitle4'), description: this.translate.instant('whyJoin.cardDescription4')}];
  progress = [
    {text: this.translate.instant('whyJoin.progress1')},
    {text: this.translate.instant('whyJoin.progress2')},
    {text: this.translate.instant('whyJoin.progress3')},
    {text: this.translate.instant('whyJoin.progress4')},
  ];
  mockFaq = {
    url: 'https://green-future-project.s3.eu-central-1.amazonaws.com/mockFaq_b00696e6-61fc-419d-b58f-492aaf0a40c5',
    title: this.translate.instant('faq.mockTitle'),
    content: this.translate.instant('faq.mockDescription'),
  };
  whatGet = [
    {
      title: this.translate.instant('whyJoin.getTitle1'),
      description: this.translate.instant('whyJoin.getDescription1')
    },
    {
      title: this.translate.instant('whyJoin.getTitle2'),
      description: this.translate.instant('whyJoin.getDescription2')
    },
    {
      title: this.translate.instant('whyJoin.getTitle3'),
      description: this.translate.instant('whyJoin.getDescription3')
    },
    {
      title: this.translate.instant('whyJoin.getTitle4'),
      description: this.translate.instant('whyJoin.getDescription4')
    }];
  progressTypes = ProgressTypes;
  url = '';
  disabledJoin = environment.showJoinTeam;
  clientPartnersInterface: ProjectsPartnersInterface[];
  partnersImages = [];
  singleFaqInterface: SingleFaqInterface[];
  routingTypes = RoutingTypes;

  constructor(
    private partnersPublicService: PartnersPublicService,
    private faqService: FaqService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.getClientPartners().then();
    setTimeout(() => {
      const dialog = this.dialog.open(CalendlyPopupComponent, { panelClass: 'noPadding' });
      //this.openSnack();
    }, 5000)
  }

  retrieveStyleBackgroundPublic(img: string): any {
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%',
      'background-opacity': '0.65'
    };
  }

  update(event): void{
    this.url = event;
  }

  setBg(url: string): any {
    let styles;
    styles = {
      'background-image': 'url(' + url + ')',
    };
    return styles;
  }

  openSnack(): void {
    this.snackBar.open(this.translate.instant('whyJoin.link'), "Go", {
      duration: 10000,
    }).onAction().subscribe(() => window.open(this.translate.instant('whyJoin.url')));
  }

  goToJoin(): void{
    this.router.navigate([RoutingTypes.SUBSCRIPTIONS]);
  }

  getClientPartners = async () => {
    try {
      const response: Response<ProjectsPartnersInterface[]> = await this.partnersPublicService.getPublicClientPartners();
      if (response?.success) {
        this.clientPartnersInterface = response.data;
        this.clientPartnersInterface.forEach(item => this.partnersImages.push(item.image.url));
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
