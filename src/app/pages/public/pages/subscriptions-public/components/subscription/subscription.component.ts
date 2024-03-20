import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SubscriptionTypeGroupsInterface} from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {AbstractControl, UntypedFormControl} from '@angular/forms';
import {UserTypes} from '../../../../../../_models/components/user-types';
import {SubscriptionTypesInterface} from '../../../../../../_models/api/subscriptions/subscription-types-interface';
import {SubscriptionTypeValuesInterface} from '../../../../../../_models/api/subscriptions/subscription-type-values-interface';
import {SubscriptionPriceInterface} from '../../../../../../_models/api/payments/price.interface';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UnitTypes} from '../../../../../../_models/components/unit-types';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {Response} from '../../../../../../_models/api/response';
import {UsersInterface} from '../../../../../../_models/api/users/users-interface';
import {StorageName} from '../../../../../../_models/components/storage-name';
import {AuthService} from '../../../../../../_services/_base/auth.service';
import {UsersService} from '../../../../../../_services/users/users.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent extends BaseComponent implements OnInit {
  @Input() subType: SubscriptionTypesInterface;
  @Input() control: AbstractControl;
  @Input() start: boolean = true;
  @Output() emitter = new EventEmitter<any>();
  co2Values: SubscriptionTypeValuesInterface[];
  frequency: string = 'perMonth';
  fakeValueCo2: {
    quantity?: number,
    project?: {
      name?: string
    }
  };
  periodSelected = new UntypedFormControl();
  userType = UserTypes;
  supported = {};
  basePrice: number;
  regions = require('src/assets/json/locale/regions.json');
  price: SubscriptionPriceInterface;
  priceId: string;
  amount: number = 0;
  costMonthly: number = 0;
  costYearly: number = 0;
  currency: string;
  hasAnnualPrice: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UsersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setInitialPrice();
    this.periodSelected.valueChanges.subscribe(value => {
      this.calculateValues();
      this.emitter.emit({
        id: this.priceId,
        amount: this.amount,
        months: value
      });
    });
    this.periodSelected.patchValue(1);
    this.setLang();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
        this.subType.description = this.subType.description_it;
    };
  }

  setInitialPrice(): void {
    this.costMonthly = Number(this.subType.costMonthly);
    this.basePrice = this.costMonthly;
    this.amount = this.costMonthly;
    this.costYearly = Number(this.subType.costYearly);
    this.currency = 'eur';
  }

  setPrice(): void {
    this.frequency = this.periodSelected.value === 12 ? 'perYear' : 'perMonth';
    const selectedRegion = localStorage.getItem('region');
    let keyword = 'Global';
    this.regions.forEach((region) => {
      if (region.code === selectedRegion) {
        keyword = region.name;
      }
    });
    const selectedPrices = this.subType.subscriptionPrices?.filter(price => 
      price.price?.name?.indexOf(keyword) >= 0
    );
    if (selectedPrices) {
      selectedPrices.forEach((price) => {
        switch (price.price.frequency) {
          case '1M':
            this.costMonthly = Number(price.price.amount);
            if (this.periodSelected.value === 1) {
              this.price = price;
            }
            break;
          case '1Y':
            this.hasAnnualPrice = true;
            this.costYearly = Number(price.price.amount);
            if (this.periodSelected.value === 12) {
              this.price = price;
            }
            break;
          default:
            break;
        }
      });
      if (this.price) {
        this.subType.selectedPrice = this.price;
        this.priceId = this.price.price.stripeId;
        this.currency = this.price.price.currency;
        this.amount = this.price.price.amount;
      }
    }
  }

  calculateValues = () => {
    this.co2Values = [];
    this.supported = {};

    for (const value of this.subType.subscriptionTypeValues) {
      if (!(value.project.type?.slug in this.supported)) {
        this.supported[value.project.type?.slug] = [];
      }
      let co2: number;

      if (value.unit?.slug === UnitTypes.TREE) {
        co2 = this.calculateCo2Trees(value.quantity, value.quantity, value.unit?.co2KgPerUnit, new Date());
      } else {
        co2 = value.quantity * value.unit?.co2KgPerUnit;
      }
      if (value.unit?.slug === UnitTypes.ACRE) {
        value.quantity = value.quantity * 0.404686;
      }
      this.supported[value.project.type?.slug].push(value);

      const co2Project = {
        quantity: co2 / 1000,
        project: {
          name: value.project.name
        }
      };
      this.co2Values.push(co2Project as SubscriptionTypeValuesInterface);
    }
    this.setPrice();
  }

  openSubscription = async (slug: string) => {
    await this.router.navigate([RoutingTypes.INDIVIDUAL_CHECKOUT.replace(':id', slug)]);
  }

  openSubscriptionOld = async (slug: string) => {
    if (this.auth.isAuthenticated()) {
      try {
        const response: Response<UsersInterface> = await this.userService.getUserById(localStorage.getItem(StorageName.id));
        if (response?.success) {
          const user = response.data;
          if (user.type === UserTypes.individual) {
            await this.router.navigate([RoutingTypes.INDIVIDUAL_CHECKOUT.replace(':id', slug)]);
          } else {
            await this.router.navigate([RoutingTypes.REGISTER], {
              queryParams: {
                from: 'subscriptions',
                type: UserTypes.individual,
                warn: 'type',
                slug,
              }
            });
          }
        }
      } catch (e) {
        await this.navigateToSignUpIndividual(slug);
      }
    } else {
      await this.navigateToSignUpIndividual(slug);
    }
  }


  navigateToSignUpIndividual = async (slug: string) => {
    await this.router.navigate([RoutingTypes.REGISTER], {
      queryParams: {
        from: 'subscriptions',
        type: UserTypes.individual,
        slug
      }
    });
  }
}
