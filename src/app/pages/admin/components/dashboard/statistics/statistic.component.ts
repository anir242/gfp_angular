import {Component, Input, OnInit} from '@angular/core';
import {UserProjectsInterface} from '../../../../../_models/api/projects/user-projects-interface';
import {BaseComponent} from '../../../../_base/base/base.component';
import {ProjectsInterface} from '../../../../../_models/api/projects/projects-interface';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Orientation} from '../../../../../_models/components/orientation';
import {ProjectTypes} from '../../../../../_models/components/project-types';
import {environment} from '../../../../../../environments/environment';
import {Response} from '../../../../../_models/api/response';


@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class DashboardStatisticComponent extends BaseComponent implements OnInit {
  @Input() label: string;
  @Input() value: number;
  @Input() icon: string;

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
    this.label = this.translate.instant('dashboard.' + this.label)
  }
}
