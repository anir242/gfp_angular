import {Component, Input, OnInit} from '@angular/core';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {BaseComponent} from '../../../_base/base/base.component';
import {CountersDataInterface} from '../../../../_models/api/counters-data-interface';

@Component({
  selector: 'app-subscription-details-projects',
  templateUrl: './subscription-details-projects.component.html',
  styleUrls: ['./subscription-details-projects.component.scss']
})
export class SubscriptionDetailsProjectsComponent extends BaseComponent implements OnInit {
  percent = 0;
  CO2NotCertified = 0;
  CO2Certified = 0;
  lastValue = 0;
  projectType: string;
  lastText: string;
  iconName?: string;
  @Input() type: CountersDataInterface;
  @Input() slug: string;
  @Input() total: number;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setText().then();
  }

  setText = async () => {
    this.percent = this.roundNumber((this.type.certified + this.type.notCertified) / this.total * 100, 2);
    this.CO2Certified = this.roundNumber(this.type.certified, 1);
    this.CO2NotCertified = this.roundNumber(this.type.notCertified, 1);
    this.lastValue = this.roundNumber(this.type.unit, 1);

    if (this.slug === ProjectTypes.restoration) {
      this.projectType = this.translate.instant('subscriptionDetails.restorationProjects');
      this.lastText = this.translate.instant('subscriptionDetails.treePlanted');
      this.iconName = ProjectTypes.restoration;
    } else if (this.slug === ProjectTypes.preservation) {
      this.projectType = this.translate.instant('subscriptionDetails.preservationProjects');
      this.lastText = this.translate.instant('subscriptionDetails.hectaresProtected');
      if (this.type.unit < 1) {
        this.lastValue = this.roundNumber(this.type.unit * 10000);
        this.lastText = this.translate.instant('subscriptionDetails.m2Protected');
      }
      this.iconName = ProjectTypes.preservation;
    } else if (this.slug === ProjectTypes.renewable_energy) {
      this.projectType = this.translate.instant('subscriptionDetails.renewableProjects');
      this.lastText = this.translate.instant('subscriptionDetails.KW/H');
      this.iconName = ProjectTypes.renewable_energy;
    } else {
      this.projectType = this.translate.instant('subscriptionDetails.marineProjects');
      this.lastText = this.translate.instant('subscriptionDetails.coral');
      this.iconName = ProjectTypes.marine_restoration;
    }
  }

}
