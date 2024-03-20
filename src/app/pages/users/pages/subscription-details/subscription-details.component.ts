import { Component, OnInit } from '@angular/core';
import { StorageName } from '../../../../_models/components/storage-name';
import { Response } from '../../../../_models/api/response';
import { CompanyEmployeesInterface } from '../../../../_models/api/companies/company-employees-interface';
import { ProjectTypes } from '../../../../_models/components/project-types';
import { SubscriptionInfoComponent } from '../../components/subscription-info/subscription-info.component';
import { CompanyService } from '../../../../_services/companies/company.service';
import { CountersInterface } from '../../../../_models/api/counters-interface';
import { SubscriptionsInterface } from '../../../../_models/api/subscriptions/subscriptions-interface';
import { SubscriptionTypes } from '../../../../_models/components/subscription-types';
import { SubscriptionTypeGroupsInterface } from '../../../../_models/api/subscriptions/subscription-type-groups-interface';
import { ClimatePioneerTypes } from '../../../../_models/components/climate-pioneer-types';
import { UsersService } from '../../../../_services/users/users.service';
import { AddSalesComponent } from '../../../admin/components/add-sales/add-sales.component';
import { StripeAppService } from 'src/app/_services/payments/stripe-app.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss'],
})
export class SubscriptionDetailsComponent
  extends SubscriptionInfoComponent
  implements OnInit
{
  userCompanyRole: string;
  subscriptionId: string;
  companyEmployees: CompanyEmployeesInterface[] = [];
  countersInterface: CountersInterface;
  subscription: SubscriptionsInterface;
  subscriptionTypes = SubscriptionTypes;
  projectTypes = ProjectTypes;
  renewal: string;
  total = 0;
  monthlyCost = 0;
  totalTons = 0;
  acres = 0;
  kw = 0;
  trees = 0;
  image: string;
  data = [
    {
      slug: ProjectTypes.restoration,
      percent: 0,
      co2Certified: 0,
      co2NotCertified: 0,
      unitValue: 0,
    },
    {
      slug: ProjectTypes.preservation,
      percent: 0,
      co2Certified: 0,
      co2NotCertified: 0,
      unitValue: 0,
    },
    {
      slug: ProjectTypes.renewable_energy,
      percent: 0,
      co2Certified: 0,
      co2NotCertified: 0,
      unitValue: 0,
    },
  ];

  constructor(
    private companyService: CompanyService,
    private usersService: UsersService,
    private stripeService: StripeAppService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.sharedService.subscriptionId) {
      localStorage.setItem(
        StorageName.subscriptionId,
        this.sharedService.subscriptionId
      );
      this.subscriptionId = this.sharedService.subscriptionId;
    } else {
      this.subscriptionId = localStorage.getItem(StorageName.subscriptionId);
    }
    this.loadSubscription().then();
    // this.getTotalEmployees().then();
  }

  loadSubscription = async () => {
    if (this.canSeeCompanyData()) {
      await this.getSubscription();
    } else {
      await this.getUserSubscriptionById();
    }
  };

  getRenewalDate(): string {
    const now = new Date();
    let date: Date = this.subscription.createdAt;
    while (date < now) {
      date = new Date(date.setMonth(date.getMonth() + 1));
    }
    return date.toString().substring(0, 10);
  }

  getSubscription = async () => {
    const subscriptionId = this.subscriptionId;
    try {
      const response: Response<any> =
        await this.companyService.getCompanySubscriptionsById(
          localStorage.getItem(StorageName.companyId),
          subscriptionId
        );
      if (response?.success) {
        this.countersInterface = response.data.counters;
        this.subscription = response.data.subscription;
        if (
          this.subscription.subscriptionType.group.slug ===
          this.subscriptionTypes.climateLeader
        ) {
          this.monthlyCost = this.subscription.subscriptionType.costMonthly;
          this.image = this.subscription.subscriptionType.image.url;
        } else if (
          ClimatePioneerTypes.manual === this.subscription.subscriptionType.slug
        ) {
          this.image = this.subscription.subscriptionType.group.images.url;
          this.monthlyCost =
            (this.subscription.itemsSold *
              this.subscription.percentageToDonate) /
            100;
        } else {
          this.image = this.subscription.subscriptionType.group.images.url;
          this.monthlyCost = this.subscription.plantPerItems;
        }
        //this.totalEmployees = this.getTotalEmployees();
        for (const countersInterfaceKey in this.countersInterface) {
          if (this.countersInterface[countersInterfaceKey] != null) {
            this.total +=
              this.countersInterface[countersInterfaceKey].notCertified +
              this.countersInterface[countersInterfaceKey].certified;
          }
        }
        this.totalTons = this.roundNumber(this.total / 1000, 1);
        this.trees = this.roundNumber(
          this.countersInterface.restoration.unit,
          1
        );
        this.acres = this.roundNumber(
          this.countersInterface.preservation.unit,
          1
        );
        this.kw = this.roundNumber(
          this.countersInterface.renewable_energy.unit,
          1
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  getUserSubscriptionById = async () => {
    try {
      const response: Response<any> =
        await this.usersService.getUserSubscriptionsById(
          localStorage.getItem(StorageName.id),
          this.subscriptionId
        );

      if (response?.success) {
        this.countersInterface = response.data.counters;
        this.subscription = response.data.subscription;

        this.monthlyCost = this.subscription.subscriptionType.costMonthly;
        this.image = this.subscription.subscriptionType.image?.url;

        for (const countersInterfaceKey in this.countersInterface) {
          if (this.countersInterface[countersInterfaceKey] !== null) {
            this.total +=
              this.countersInterface[countersInterfaceKey].notCertified +
              this.countersInterface[countersInterfaceKey].certified;
          }
        }

        this.totalTons = this.roundNumber(this.total / 1000, 1);
        this.trees = this.roundNumber(
          this.countersInterface.restoration.unit,
          1
        );
        this.acres = this.roundNumber(
          this.countersInterface.preservation.unit,
          1
        );
        this.kw = this.roundNumber(
          this.countersInterface.renewable_energy.unit,
          1
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  keepOrder = (a, b) => {
    return a;
  };

  getTotal = (item: SubscriptionTypeGroupsInterface): number => {
    let total = 0;
    item.subscriptionsTypes.forEach((it) => {
      total += it.costMonthly * it.companyEmployees.length;
    });
    return total;
  };

  async openDialog(): Promise<void> {
    this.dialog.open(AddSalesComponent, {
      data: {
        subscriptionId: this.subscriptionId,
        subscription: this.subscription,
        userId: localStorage.getItem(StorageName.id),
      },
    });
  }
}
