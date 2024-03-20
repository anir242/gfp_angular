import { BreakpointObserver } from '@angular/cdk/layout';
import {Component, Input, OnInit} from '@angular/core';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-project-title-public',
  templateUrl: './project-title-public.component.html',
  styleUrls: ['./project-title-public.component.scss']
})
export class ProjectTitlePublicComponent extends BaseComponent implements OnInit {
  @Input() projectSlug: string;
  @Input() description: string;
  @Input() firstData: string;
  @Input() secondData: string;
  @Input() thirdData: string;
  @Input() borderColor: string;
  @Input() arrow: string;

  routingTypes = RoutingTypes;
  isMobile: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 991px)');
    this.isMediumScreen = this.breakpointObserver.isMatched('(max-width: 1199px)');
  }

  retrieveUnderline(): any {
    return {
      'border-bottom': `2px solid ${this.borderColor}`
    };
  }
}
