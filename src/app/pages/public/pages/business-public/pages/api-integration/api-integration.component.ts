import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {ProgressTypes} from '../../../../../../_models/components/progress-types';
import {environment} from '../../../../../../../environments/environment';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {translate} from '@angular/localize/tools';

@Component({
  selector: 'app-api-integration',
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.scss']
})
export class ApiIntegrationComponent extends BaseComponent implements OnInit {
  urlBg = 'https://green-future-project.s3.eu-central-1.amazonaws.com/apiBg_b9eb3bde-3156-452e-8db8-0473b641d883';
  urlReadyJoin = 'https://green-future-project.s3.eu-central-1.amazonaws.com/readyJoin_786c28f0-41bc-4757-a284-40898f4413b3';
  progressData = [
    {text: this.translate.instant('apiIntegration.progressData1')},
    {text: this.translate.instant('apiIntegration.progressData2')},
    {text: this.translate.instant('apiIntegration.progressData3')},
    {text: this.translate.instant('apiIntegration.progressData4')},
  ];
  progressClimate = [
    {text: this.translate.instant('apiIntegration.progressClimate1')},
    {text: this.translate.instant('apiIntegration.progressClimate2')},
    {text: this.translate.instant('apiIntegration.progressClimate3')},
    {text: this.translate.instant('apiIntegration.progressClimate4')},
  ];
  cmsImages = [
    'https://green-future-project.s3.eu-central-1.amazonaws.com/magento_9cd2a4ba-dc4d-48a3-8056-e13dc1c0e55e',
    'https://green-future-project.s3.eu-central-1.amazonaws.com/shopify_66481464-cb8e-48a9-85ad-3952cdc1a62e',
    'https://green-future-project.s3.eu-central-1.amazonaws.com/woocommerce_f49c6732-5882-4ce5-894d-f9954c51c887',
    'https://green-future-project.s3.eu-central-1.amazonaws.com/wordpress_b63b5121-f2cc-497a-9606-f0370d5e3691'
  ];
  disabledJoin = environment.showJoinTeam;
  enabledStartNow = environment.showSubscriptionPlans;
  progressTypes = ProgressTypes;
  step2Url = 'https://green-future-project.s3.eu-central-1.amazonaws.com/Layers.png';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  retrieveStyleBackgroundPublic(img: string): any {
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%',
      'background-opacity': '0.65'
    };
  }

  goToJoin(): void {
    this.router.navigate([RoutingTypes.SUBSCRIPTIONS]);
  }

  startNow(): void {
    this.router.navigate(['/subscriptions/business/climatePioneer']);
  }

  contact(): void {
    window.location.assign('mailto:' + this.translate.instant('footer.email'));

  }

  readMore(title: string): void {
  }
}
