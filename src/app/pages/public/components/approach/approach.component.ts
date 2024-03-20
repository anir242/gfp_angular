import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {Response} from '../../../../_models/api/response';
import {ProjectTypologyInterface} from '../../../../_models/api/public/project-typology-interface';
import {hexToCSSFilter} from '../../../../_models/components/hexToCSSFilter';
import {ProjectTypologyService} from '../../../../_services/public/project-typology.service';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-approach',
  templateUrl: './approach.component.html',
  styleUrls: ['./approach.component.scss']
})
export class ApproachComponent extends BaseComponent implements OnInit {
  projectTypologyInterface: ProjectTypologyInterface[];
  constructor(
    private projectTypologyService: ProjectTypologyService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTypologyData();
  }

  async getTypologyData(): Promise<void>{
    try {
      const response: Response<ProjectTypologyInterface[]> = await this.projectTypologyService.getProjectTypes();
      if (response?.success) {
        this.projectTypologyInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }

  async goToProjectType(type: string): Promise<void>{
    await this.router.navigate([RoutingTypes.ABOUT_PUBLIC, type]);
  }
}
