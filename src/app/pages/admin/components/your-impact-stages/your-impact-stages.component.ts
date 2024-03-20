import {Component, Input, OnInit} from '@angular/core';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {ProjectsInterface} from '../../../../_models/api/projects/projects-interface';
import {SharedDataProjectService} from '../../../../_services/projects/shared-data-project.service';
import {ProjectTypesInterface} from '../../../../_models/api/projects/project-types-interface';
import {Response} from '../../../../_models/api/response';
import {ProjectsService} from '../../../../_services/projects/projects.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {ActivatedRoute, RoutesRecognized} from '@angular/router';
import {ProjectStagesInterface} from '../../../../_models/api/projects/project-stages-interface';
import {stagesTypes} from '../../../../_models/components/stages-types';
import { SinglePaymentPacksInterface } from '../../../../_models/api/public/single-payment-packs-interface';
import { CardIconSmallComponent } from 'src/app/pages/public/pages/business-public/components/card-icon-small/card-icon-small.component';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-your-impact-stages',
  templateUrl: './your-impact-stages.component.html',
  styleUrls: ['./your-impact-stages.component.scss']
})
export class YourImpactStagesComponent extends BaseComponent implements OnInit {
  @Input() pack: SinglePaymentPacksInterface;
  @Input() unit: number;
  @Input() name: string;
  projectType: ProjectTypesInterface;
  companyId: string;
  slug: string;
  stage = 0;
  percent = 0;
  active = false;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private sharedDataProjectService: SharedDataProjectService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params.slug;
      this.companyId = params.id;
      this.projectType = this.sharedDataProjectService.project.type;
      this.isActive().then();
      this.getDescription();
    });
  }

  isActive = async () => {
    try {
      let response: Response<ProjectsInterface>;
      if (this.companyId) {
        response = await this.projectsService.getPublicProjectBySlug(this.slug);
      } else {
        response = await this.projectsService.getProjectBySlug(this.slug);
      }
      if (response?.success) {
        this.active = response.data.isActive || this.companyId != null;
        await this.getProjectStages(this.slug);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getDescription(): void {
    this.description = this.translate.instant('stages.' + this.projectType?.slug + this.stage.toString());
  }

  isRestoration = (): boolean => {
    return this.projectType.slug === ProjectTypes.restoration;
  }
  isMarineRestoration = (): boolean => {
    return this.projectType.slug === ProjectTypes.marine_restoration;
  }
  isPreservation = (): boolean => {
    return this.projectType.slug === ProjectTypes.preservation;
  }
  isRenewable = (): boolean => {
    return this.projectType.slug === ProjectTypes.renewable_energy;
  }

  async getProjectStages(projectSlug: string): Promise<void> {
    const params: any = {
      projectSlug
    };
    try {
      let unit = this.sharedDataProjectService?.counters?.unit;
      if (!unit) {
        unit = this.unit;
      }
      if (unit) {
        let response: Response<ProjectStagesInterface[]>;
        if (this.companyId) {
          response = await this.projectsService.getPublicProjectStages(params);
        } else {
          response = await this.projectsService.getProjectStages(params);
        }
        if (response?.success) {
          const possibleStages = response.data;
          let foundStages = false;
          possibleStages.forEach(stage => {
            if ((stage.minValue < unit && stage.maxValue >= unit)) {
              foundStages = true;
              this.percent = this.roundNumber((unit - stage.minValue) / (stage.maxValue - stage.minValue) * 100);
              switch (stage.slug) {
                case stagesTypes.stage1: {
                  this.stage = 1;
                  break;
                }
                case stagesTypes.stage2: {
                  this.stage = 2;
                  break;
                }
                case stagesTypes.stage3: {
                  this.stage = 3;
                  break;
                }
                case stagesTypes.stage4: {
                  this.stage = 4;
                  break;
                }
              }
            }
          });
          if (!foundStages) {
            this.stage = 4;
            this.percent = 100;
          }
          this.getDescription();
        }
      }

    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  getId(): string {
    if (this.isRestoration()) {
      return 'reforestationStg';
    }
    if (this.isMarineRestoration()) {
      return 'marineStg';
    }
    if (this.isPreservation()) {
      return 'preservationStg';
    }
    if (this.isRenewable()) {
      return 'renewableStg';
    }

  }
}

