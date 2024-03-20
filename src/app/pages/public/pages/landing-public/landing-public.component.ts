import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from '../../../_base/base/base.component';
import { RoutingTypes } from '../../../../_models/components/routing-types';
import { SingleFaqInterface } from '../../../../_models/api/public/faq/single-faq-interface';
import { Response } from '../../../../_models/api/response';
import { ProjectsPartnersInterface } from '../../../../_models/api/projects/projects-partners-interface';
import { TeamInterface } from 'src/app/_models/api/public/team-interface';
import { TeamService } from 'src/app/_services/public/team.service';
import { PartnersPublicService } from '../../../../_services/public/partners.public.service';
import { HomepagePopupComponent } from '../../components/homepage-popup/homepage-popup.component';
import { CalendlyPopupComponent } from 'src/app/pages/public/components/calendly-popup/calendly-popup.component';

@Component({
  selector: 'app-landing-public',
  templateUrl: './landing-public.component.html',
  styleUrls: ['./landing-public.component.scss'],
  //host: {'(window:scroll)': 'displayPopup($event)'}
})
export class LandingPublicComponent extends BaseComponent implements OnInit {
  urlHome = '';
  urlPlans =
    'https://green-future-project.s3.eu-central-1.amazonaws.com/plans_bg_896db5a4-16dc-41a1-a792-dc069e470a2d';
  urlGift =
    'https://green-future-project.s3.eu-central-1.amazonaws.com/plans_bg_896db5a4-16dc-41a1-a792-dc069e470a2d';
  urlSubscribe =
    'https://green-future-project.s3.eu-central-1.amazonaws.com/subscribe_bg_29ca0f22-9407-4ef6-b018-e98ddc3d8f9f';
  testData = [
    {
      name: 'test',
      caption: 'no',
      image: 'assets/images/testImage2.jpg',
      description: 'descrizione',
    },
  ];
  unsure = [
    {
      title: this.translate.instant('landingPublicUnsure.view'),
      description: this.translate.instant('landingPublicUnsure.select'),
    },
    {
      title: this.translate.instant('landingPublicUnsure.get'),
      description: this.translate.instant('landingPublicUnsure.real'),
    },
    {
      title: this.translate.instant('landingPublicUnsure.photographic'),
      description: this.translate.instant('landingPublicUnsure.enjoy'),
    },
  ];
  mockFaq = {
    url: 'https://green-future-project.s3.eu-central-1.amazonaws.com/mockFaq_b00696e6-61fc-419d-b58f-492aaf0a40c5', // TODO: UPDATE FAQ PIE CHART HERE
    title: this.translate.instant('faq.mockTitle'),
    content: this.translate.instant('faq.mockDescription'),
  };
  singleFaqInterface: SingleFaqInterface[];
  routingTypes = RoutingTypes;
  clientPartnersInterface: ProjectsPartnersInterface[];
  ambassadorInterface: TeamInterface[];
  partnersImages = [];
  business: boolean = localStorage.getItem('clientType') === '2';
  popupDisplayed: boolean = false;
  dataSection: any;
  timeOutIds = [];

  constructor(
    private partnersPublicService: PartnersPublicService,
    private teamService: TeamService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getClientPartners().then();
    this.getTeam().then();
    // this.showDemoPopup(20);
    // //this.dataSection = document.getElementById('achievementsData');
    // if (localStorage.getItem('newsletter')) {
    //   this.popupDisplayed = true;
    // }
  }

  ngOnDestroy() {
    this.timeOutIds.forEach((id) => clearTimeout(id));
  }

  goToGift(): void {
    this.router.navigate([RoutingTypes.GIFT]);
  }

  onConsent(): void {
    this.pixelService.initialize();
  }

  getClientPartners = async () => {
    try {
      const response: Response<ProjectsPartnersInterface[]> =
        await this.partnersPublicService.getPublicClientPartners();
      if (response?.success) {
        this.clientPartnersInterface = response.data;
        this.clientPartnersInterface.forEach((item) =>
          this.partnersImages.push(item.image.url)
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  getTeam = async () => {
    const params: any = {};
    try {
      const response: Response<TeamInterface[]> =
        await this.teamService.getTeam(params);
      if (response?.success) {
        this.ambassadorInterface = response.data.filter((it) => !it.creator);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  // setTimer(seconds: number): void {
  //   this.dataSection = document.getElementById('achievementsData');
  //   setTimeout(() => {
  //     if (!this.popupDisplayed && window.innerWidth > 992) {
  //       const dialog = this.dialog.open(HomepagePopupComponent, {
  //         panelClass: 'noPadding',
  //       });
  //       this.popupDisplayed = true;
  //     }
  //   }, seconds * 1000);
  // }

  showDemoPopup(seconds: number): void {
    this.timeOutIds.push(
      setTimeout(() => {
        this.dialog.open(CalendlyPopupComponent, {
          data: {
            buttonUrl: 'https://page.greenfutureproject.com/meeting-popup',
            type: 'demo',
          },
          panelClass: 'noPadding',
        });
      }, seconds * 1000)
    );
  }

  // displayPopup(event: any): void {
  //   if (
  //     !this.popupDisplayed &&
  //     window.pageYOffset > this.dataSection.offsetTop &&
  //     window.innerWidth > 992
  //   ) {
  //     //const dialog = this.dialog.open(
  //     //  HomepagePopupComponent, { panelClass: 'noPadding' }
  //     //);
  //     //this.popupDisplayed = true;
  //     //localStorage.setItem('newsletter', 'displayed');
  //   }
  // }
}
