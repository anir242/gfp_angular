import {Component, Input, OnInit} from '@angular/core';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {BaseComponent} from '../../../_base/base/base.component';
import {SinglePaymentPacksService} from '../../../../_services/public/single-payment-packs.service';
import {SinglePaymentPacksInterface} from '../../../../_models/api/public/single-payment-packs-interface';
import {Response} from '../../../../_models/api/response';
import {ProjectsInterface} from '../../../../_models/api/projects/projects-interface';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-project-details-title',
  templateUrl: './project-details-title.component.html',
  styleUrls: ['./project-details-title.component.scss']
})
export class ProjectDetailsTitleComponent extends BaseComponent implements OnInit {
  routingTypes = RoutingTypes;
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  url = environment.url;
  @Input() projectInterface: ProjectsInterface;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() name?: string;
  @Input() arrow?: string;
  color?: string;
  @Input() country?: string;
  @Input() continent?: string;
  @Input() description?: string;
  @Input() slug?: string;

  @Input() projectType?: string;

  constructor(
    private route: ActivatedRoute,
    private singlePaymentPacksService: SinglePaymentPacksService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.color = this.projectInterface.type.colorSecondary;
    this.url = this.url + this.router.url;
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.slug);
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getBackground = (activeProject: ProjectsInterface): any => {
    const bgJson: any = {};
    bgJson.background = `url(${activeProject.image.url})`;
    bgJson['background-size'] = 'cover';
    bgJson['background-position'] = 'center center';
    bgJson['background-repeat'] = 'no-repeat';
    return bgJson;
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

  goToContact = async (): Promise<void> => {
    await this.router.navigate(['faq'])
  }
}
