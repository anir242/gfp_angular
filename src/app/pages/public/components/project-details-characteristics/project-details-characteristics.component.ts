import {Component, Input, OnInit} from '@angular/core';
import {ProjectDataInterface} from '../../../../_models/api/projects/project-data-interface';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-project-details-characteristics',
  templateUrl: './project-details-characteristics.component.html',
  styleUrls: ['./project-details-characteristics.component.scss']
})
export class ProjectDetailsCharacteristicsComponent extends BaseComponent implements OnInit {
  @Input() mainTitle: string;
  @Input() description: string;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() textBeforeButton?: string;
  @Input() data?: any;
  @Input() projectSlug?: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  goToTypology(): void{
    this.router.navigate([RoutingTypes.ABOUT_PUBLIC, this.projectSlug]);
  }
}
