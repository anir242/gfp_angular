import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UserTypes} from '../../../../../../_models/components/user-types';
import {UntypedFormControl} from '@angular/forms';
import { MainSubscriptionsService } from '../../../../../../_services/subscriptions/main-subscriptions.service';
import {Response} from '../../../../../../_models/api/response';
import {
  SubscriptionTypeGroupsInterface
} from '../../../../../../_models/api/subscriptions/subscription-type-groups-interface';
import {MatAccordion} from '@angular/material/expansion';
import { RoutingTypes } from '../../../../../../_models/components/routing-types';
import { CalendlyPopupComponent } from '../../../../../public/components/calendly-popup/calendly-popup.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-main-subscriptions',
  templateUrl: './main-subscriptions.component.html',
  styleUrls: ['./main-subscriptions.component.scss']
})
export class MainSubscriptionsComponent extends BaseComponent implements OnInit {
  urlReadyJoin = 'https://green-future-project.s3.eu-central-1.amazonaws.com/readyJoin_786c28f0-41bc-4757-a284-40898f4413b3';
  subscriptionGroups: SubscriptionTypeGroupsInterface[] = [];
  userType = UserTypes;

  typeSelected = new UntypedFormControl();

  constructor(
    private mainSubscriptionsService: MainSubscriptionsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.typeSubscribe();
    this.getParams();
    // this.typeSelected.patchValue(this.userType.individual);
  }

  viewProducts(type: string) {
    let products: any[] = [];
    this.subscriptionGroups.forEach((group) => {
      if (type == 'business') {
        products.push(this.asProduct(group.id, group.name, 'eur', 0, 1, group.slug, 'subscriptions', type, 'subscriptions', 'Subscriptions'));
      } else {
        group.subscriptionsTypes.forEach((subType) => {
          products.push(
            this.asProduct(
              subType.id, subType.name, 'eur', subType.costMonthly, 1, subType.slug, 'subscriptions', type, 'subscriptions', 'Subscriptions'));
        });
      }
    });
    this.track('view_item_list', products);
  }

  getParams(): void {
    this.route.queryParams.subscribe(params => {
      switch (params.type) {
        case UserTypes.business:
          this.typeSelected.patchValue(this.userType.business);
          break;
        default:
          this.typeSelected.patchValue(this.userType.individual);
          break;
      }
    });
  }

  typeSubscribe = () => {
    this.typeSelected.valueChanges.subscribe(async value => {
      const params = {
        type: value
      };
      try {
        const response: Response<SubscriptionTypeGroupsInterface[]> = await this.mainSubscriptionsService.getMainSubscription(params);
        if (response?.success) {
          this.subscriptionGroups = response.data;
          if (value === 'business') {
            setTimeout(() => {
              const dialog = this.dialog.open(CalendlyPopupComponent, { panelClass: 'noPadding' });
            }, 3000)
          };
          this.viewProducts(value);
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
    });
  };

  openSnack(): void {
    this.snackBar.open(this.translate.instant('whyJoin.link'), "Go", {
      duration: 10000,
    }).onAction().subscribe(() => window.open(this.translate.instant('whyJoin.url')));
  }

  retrieveStyleBackgroundPublic(img: string): any {
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%',
      'background-opacity': '0.65'
    };
  }

  goToGift(): void {
    this.router.navigate([RoutingTypes.GIFT]);
  }

}
