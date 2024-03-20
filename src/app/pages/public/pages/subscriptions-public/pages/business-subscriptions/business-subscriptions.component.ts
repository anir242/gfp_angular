import {Component, OnInit, ViewChild} from '@angular/core';
import {MainSubscriptionsService} from '../../../../../../_services/subscriptions/main-subscriptions.service';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {Response} from '../../../../../../_models/api/response';
import {
  SubscriptionTypeGroupsInterface
} from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {SubscriptionTypes} from '../../../../../../_models/components/subscription-types';
import {UntypedFormArray, UntypedFormControl} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../../../../_services/_base/auth.service';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {UserTypes} from '../../../../../../_models/components/user-types';
import {UsersService} from '../../../../../../_services/users/users.service';
import {StorageName} from '../../../../../../_models/components/storage-name';
import { UsersInterface } from '../../../../../../_models/api/users/users-interface';
import { ClimatePioneerTypes, ClimatePioneerModels } from '../../../../../../_models/components/climate-pioneer-types';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { UnitSlugs } from 'src/app/_models/components/unit-slugs';

@Component({
  selector: 'app-business-subscriptions',
  templateUrl: './business-subscriptions.component.html',
  styleUrls: ['./business-subscriptions.component.scss']
})
export class BusinessSubscriptionsComponent extends BaseComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  subscriptionGroup: SubscriptionTypeGroupsInterface;
  subscriptionTypes = SubscriptionTypes;
  employees = new UntypedFormArray([]);
  slug: string;

  @ViewChild('startNow') startNow: MatButton;

  pioneerSelected: string;
  pioneerModel: string;
  updated = false;

  itemsOrRevenues = new UntypedFormControl(0);
  percentageOrItemToPlant = new UntypedFormControl(0);

  constructor(
    private mainSubscriptionsService: MainSubscriptionsService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private userService: UsersService
  ) {
    super();
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.params.slug;
    this.getSubscriptionTypes(slug).then();
  }

  viewProduct() {
    let products: any[] = [];
    let event = 'view_item'
    if (this.subscriptionGroup?.slug === SubscriptionTypes.climateLeader) {
      this.subscriptionGroup?.subscriptionsTypes.forEach((subType) => {
        products.push(this.asProduct(
          subType.id, subType.name, 'eur', subType.costMonthly, 1,
          subType.slug, 'subscriptions', 'business', 'subscriptions', 'Subscriptions'
        ));
      });
      event = 'view_item_list';
    } else {
      products.push(this.asProduct(
        this.subscriptionGroup.id,
        this.subscriptionGroup.name,
        'eur', 20, 1, ClimatePioneerTypes.manual,
        'subscriptions', 'business', 'subscriptions', 'Subscriptions'
      ));
    }
    this.track(event, products);
  }


  getSubscriptionTypes = async (slug: string) => {
    try {
      this.slug = slug;
      const response: Response<SubscriptionTypeGroupsInterface> = await this.mainSubscriptionsService.getMainSubscriptionBySlug(slug);
      if (response?.success) {
        this.subscriptionGroup = response.data;
        if (this.subscriptionGroup?.slug === SubscriptionTypes.climateLeader) {
          for (const it of this.subscriptionGroup?.subscriptionsTypes) {
            this.employees.push(new UntypedFormControl(0));
          }
          this.setEmployeesListener();
        } else {
          this.pioneerModel = ClimatePioneerModels.treePerItem;
          this.pioneerSelected = ClimatePioneerTypes.manual;
        }
        this.viewProduct();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  quantity = (i: number): UntypedFormControl => {
    return this.employees.at(i) as UntypedFormControl;
  }

  setUpdate = (event: StepperSelectionEvent) => {
    this.updated = event.selectedIndex !== 2;
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  setEmployeesListener = () => {
    this.employees.valueChanges.subscribe((items: any[]) => {
      this.startNow.disabled = items.filter(it => it > 0).length === 0;
    });
  }

  clickStartNow = async () => {
    localStorage.setItem(StorageName.businessEmployees, this.employees.value);
    localStorage.setItem(StorageName.businessPioneer,
      this.pioneerSelected + ';' + this.itemsOrRevenues.value + ';' + this.percentageOrItemToPlant.value + ';' + this.pioneerModel
    );
    await this.router.navigate([RoutingTypes.BUSINESS_CHECKOUT.replace(':id', this.slug)]);
  }

  clickStartNowOld = async () => {
    localStorage.setItem(StorageName.businessEmployees, this.employees.value);
    localStorage.setItem(StorageName.businessPioneer,
      this.pioneerSelected + ';' + this.itemsOrRevenues.value + ';' + this.percentageOrItemToPlant.value + ';' + this.pioneerModel
    );
    if (this.auth.isAuthenticated()) {
      try {
        const response: Response<UsersInterface> = await this.userService.getUserById(localStorage.getItem(StorageName.id));
        if (response?.success) {
          const user = response.data;
          if (user.type === UserTypes.business) {
            await this.router.navigate([RoutingTypes.BUSINESS_CHECKOUT.replace(':id', this.slug)]);
          } else {
            await this.router.navigate([RoutingTypes.REGISTER], {
              queryParams: {
                from: 'subscriptions',
                type: UserTypes.business,
                warn: 'type',
                slug: this.slug
              }
            });
          }
        }
      } catch (e) {
        await this.navigateToSignUpBusiness();
      }
    } else {
      await this.navigateToSignUpBusiness();
    }
  }

  navigateToSignUpBusiness = async () => {
    await this.router.navigate([RoutingTypes.REGISTER], {
      queryParams: {
        from: 'subscriptions',
        type: UserTypes.business,
        slug: this.slug
      }
    });
  }

  getValue($event: any): void {
    if (typeof $event === 'string') {
      this.pioneerModel = $event;
    }
  }

  setStartNow($event: boolean): void {
    this.startNow.disabled = !$event;
  }
}
