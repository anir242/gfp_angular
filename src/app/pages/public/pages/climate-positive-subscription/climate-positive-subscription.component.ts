import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { ProjectsInterface } from '../../../../_models/api/projects/projects-interface';
import { MainSubscriptionsService } from '../../../../_services/subscriptions/main-subscriptions.service';
import { SubscriptionTypeGroupsInterface } from '../../../../_models/api/subscriptions/subscription-type-groups-interface';
import { SubscriptionTypeValuesInterface } from '../../../../_models/api/subscriptions/subscription-type-values-interface';
import { Response } from '../../../../_models/api/response';
import { UserProjectsService } from '../../../../_services/projects/user-projects.service';
import { StorageName } from '../../../../_models/components/storage-name';
import { UsersInterface } from '../../../../_models/api/users/users-interface';
import { UsersService } from '../../../../_services/users/users.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UnitTypes } from '../../../../_models/components/unit-types';
import { CalendlyPopupComponent } from '../../components/calendly-popup/calendly-popup.component';
import { RoutingTypes } from 'src/app/_models/components/routing-types';

@Component({
  selector: 'app-climate-positive-subscription',
  templateUrl: './climate-positive-subscription.component.html',
  styleUrls: ['./climate-positive-subscription.component.scss'],
})
export class ClimatePositiveSubscriptionComponent
  extends BaseComponent
  implements OnInit
{
  business: boolean = localStorage.getItem('clientType') === '2';
  slug: string = 'climateLeader';
  group: SubscriptionTypeGroupsInterface;
  projects: ProjectsInterface[] = [];
  projectIds: string[] = [];
  isSmallScreen: boolean;
  checkoutUrl: string;
  timeOutIds = [];

  constructor(
    private subscriptionsService: MainSubscriptionsService,
    private breakpointObserver: BreakpointObserver
  ) {
    super();
  }

  ngOnInit(): void {
    this.checkoutUrl = RoutingTypes.LEADER_CHECKOUT;
    this.getSubscriptionType().then();
    this.viewProduct();
    this.isSmallScreen =
      this.breakpointObserver.isMatched('(max-width: 991px)');
    this.timeOutIds.push(setTimeout(() => this.displayPopup(), 10000));
  }

  ngOnDestroy() {
    this.timeOutIds.forEach((id) => clearTimeout(id));
  }

  getSubscriptionType = async () => {
    try {
      const response: Response<SubscriptionTypeGroupsInterface> =
        await this.subscriptionsService.getMainSubscriptionBySlug(this.slug);
      if (response?.success) {
        this.group = response.data;
        this.calculateValues();
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      for (let i = 0; i < this.group.subscriptionsTypes.length; i++) {
        this.group.subscriptionsTypes[i].description =
          this.group.subscriptionsTypes[i].description_it;
      }
    }
  }

  calculateValues(): void {
    this.group.subscriptionsTypes?.forEach((subType) => {
      if (subType.status == 'active') {
        subType.supported = {};
        subType.co2Values = [];
        subType.subscriptionTypeValues?.forEach((value) => {
          if (this.projectIds.indexOf(value.projectId) < 0) {
            this.projects.push(value.project);
            this.projectIds.push(value.projectId);
          }
          if (!(value.project.type?.slug in subType.supported)) {
            subType.supported[value.project.type?.slug] = [];
          }

          let co2: number;

          if (value.unit?.slug === UnitTypes.TREE) {
            co2 = this.calculateCo2Trees(
              value.quantity,
              value.quantity,
              value.unit?.co2KgPerUnit,
              new Date()
            );
          } else {
            co2 = value.quantity * value.unit?.co2KgPerUnit;
          }

          if (value.unit?.slug === UnitTypes.ACRE) {
            value.quantity = value.quantity * 0.404686;
          }
          subType.supported[value.project.type?.slug].push(value);

          const co2Project = {
            quantity: co2 / 1000,
            project: {
              name: value.project.name,
            },
          };
          subType.co2Values.push(co2Project as SubscriptionTypeValuesInterface);
        });
      }
    });
  }

  getBackground = (project: ProjectsInterface): any => {
    const bgJson: any = {};
    if (project.miniatureImageId) {
      bgJson.background = `url(${project.miniatureImage.url})`;
    } else {
      bgJson.background = `url(${project.image?.url})`;
    }
    bgJson['background-size'] = 'cover';
    bgJson['background-position'] = 'center center';
    bgJson['background-repeat'] = 'no-repeat';
    return bgJson;
  };

  openProject = async (id: string) => {
    await this.router.navigate(['/projects', id]);
  };

  goToContact = async () => {
    await this.router.navigate(['/faq']);
  };

  viewProduct() {
    this.track('view_item', [
      this.asProduct(
        'climate-positive-subscription',
        'Climate Positive Subscription',
        'EUR',
        0,
        1,
        'subscription',
        'subscriptions',
        'business',
        'subscriptions',
        'Subscriptions'
      ),
    ]);
  }

  goToCheckout = () => {
    localStorage.removeItem(StorageName.businessEmployees);
    this.router.navigate([this.checkoutUrl]);
  };

  displayPopup(): void {
    this.dialog.open(CalendlyPopupComponent, {
      data: {
        buttonUrl: 'https://page.greenfutureproject.com/meeting-popup',
        type: 'demo',
      },
      panelClass: 'noPadding',
    });
  }

  routeToCalendly(): void {
    window.open(
      'https://page.greenfutureproject.com/meeting-website',
      '_blank'
    );
  }
}
