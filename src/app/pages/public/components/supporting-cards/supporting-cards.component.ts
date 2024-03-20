import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ProjectsPartnersInterface} from '../../../../_models/api/projects/projects-partners-interface';
import {PartnersPublicService} from '../../../../_services/public/partners.public.service';
import {Response} from '../../../../_models/api/response';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-supporting-cards',
  templateUrl: './supporting-cards.component.html',
  styleUrls: ['./supporting-cards.component.scss']
})
export class SupportingCardsComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Input() type: 'small'|'large';
  @Input() slug: string;

  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  arrows: boolean;
  projectsPartnersInterface: ProjectsPartnersInterface[];

  constructor(
    private partnersPublicService: PartnersPublicService,
    private breakpointObserver: BreakpointObserver,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.slug){
      this.getPartnersBySlug(this.slug).then();
    }else{
      this.getPartners().then();
    }
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.projectsPartnersInterface.forEach(partner => {
        partner.description = partner.description_it;
      });
    }
  }

  cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.cardWidth = 350;
        this.carouselHeight = 300;
        if (this.projectsPartnersInterface?.length >3){
          this.arrows = true;
        }else{
          this.arrows = false;
        }
      } else {
        this.cardWidth = 250;
        this.carouselHeight = 250;
        this.arrows = false;
      }
    });
  }

  toggle(event): void {
    const singleCard = document.getElementById(event);
    if (singleCard.classList.contains('flipped')) {
      singleCard.classList.remove('flipped');
    } else {
      singleCard.classList.add('flipped');

    }
    this.toggleProperty = !this.toggleProperty;
  }

  getPartners = async () => {
    try {
      const response: Response<ProjectsPartnersInterface[]> = await this.partnersPublicService.getPublicPartners();
      if (response?.success) {
        this.projectsPartnersInterface = response.data;
        this.cardMeasures();
        this.setLang();

      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
  getPartnersBySlug = async (projectSlug: string) => {
    const params: any = {
      slug: projectSlug,
    };
    try {
      const response: Response<ProjectsPartnersInterface[]> = await this.partnersPublicService.getPublicPartnersBySlug(params);
      if (response?.success) {
        this.projectsPartnersInterface = response.data;
        this.cardMeasures();
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
