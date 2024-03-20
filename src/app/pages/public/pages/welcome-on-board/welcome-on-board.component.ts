import {Component, OnInit} from '@angular/core';
import {OrderSummaryService} from '../../../../_services/public/local/order-summary.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {coerceStringArray} from '@angular/cdk/coercion';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {CartInterface} from '../../../../_models/cart-interface';
import {CartTypes} from '../../../../_models/components/cart-types';
import {StorageName} from '../../../../_models/components/storage-name';
import {Response} from '../../../../_models/api/response';
import {UsersInterface} from '../../../../_models/api/users/users-interface';
import {UsersService} from '../../../../_services/users/users.service';
import {ShareButtonsPopup} from 'ngx-sharebuttons/popup';
import {UserTypes} from "../../../../_models/components/user-types";
import {InviteEmployeeComponent} from '../../../../components/invite-employee/invite-employee.component';
import {ModalComponent} from '../../../../components/modal/modal.component';
import {CompanyEmployeesInterface} from '../../../../_models/api/companies/company-employees-interface';
import {MatTableDataSource} from '@angular/material/table';
import {SubscriptionsService} from '../../../../_services/subscriptions/subscriptions.service';
import {CompanyEmployeesService} from '../../../../_services/companies/company-employees.service';

@Component({
  selector: 'app-welcome-on-board',
  templateUrl: './welcome-on-board.component.html',
  styleUrls: ['./welcome-on-board.component.scss']
})
export class WelcomeOnBoardComponent extends BaseComponent implements OnInit {
  urlBg = 'https://green-future-project.s3.eu-central-1.amazonaws.com/publicHomeBg_a3583a49-5257-4f9f-a8ff-0d8f7440a2a7';
  total: number;
  items: CartInterface[];
  cartTypes = CartTypes;
  title: string;
  url: string;
  subtitle: string;
  cartType: string;
  button1: string;
  button2: string;
  button1Action: string;
  button2Action: string;
  companyEmployees: CompanyEmployeesInterface[];
  isClimateLeader: boolean;
  // button1Action: () => any;
  // button2Action: () => any;
  user: UsersInterface;

  constructor(
    private cartService: OrderSummaryService,
    private internalRouter: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private subscriptionsService: SubscriptionsService,
    private companyEmployeesService: CompanyEmployeesService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.isClimateLeader = false;
    this.cartType = this.getCartType();
    this.items = this.cartService.getItemsByType(this.cartType);
    if (this.cartType === CartTypes.SUBSCRIPTION) {
      this.getEmployees().then();
      if (this.items.length > 0) {
        if (this.items[0].subscriptions.length > 1) {
          this.isClimateLeader = true;
        }
      }
    }
    // this.checkCart(this.cartType);
    this.setText(this.cartType);
    this.cartService.clearCartByType(CartTypes.SINGLE_DONATION);
    this.cartService.clearCartByType(CartTypes.GIFT);
  }

  async getEmployees(): Promise<void> {
    try {
      const response: Response<CompanyEmployeesInterface[]> = await this.companyEmployeesService.getCompanyEmployees();
      if (response?.success) {
        this.companyEmployees = response.data;
        this.cartService.clearCartByType(CartTypes.SUBSCRIPTION);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  getCartType(): string {
    if (this.items.length > 0) {
      return this.items[0].internalType;
    } else {
      return 'singleDonation'
      //this.router.navigate([RoutingTypes.HOME_PUBLIC]).then();
    }
  }

  setText(type: string): void {
    switch (type) {
      case CartTypes.GIFT: {
        this.url = 'assets/images/svg/plant.svg';
        this.title = this.translate.instant('giftOnBoard.title');
        this.subtitle = this.translate.instant('giftOnBoard.description', {value: this.items[0].gift.sender.email});
        this.button1 = this.translate.instant('giftOnBoard.back');
        this.button2 = this.translate.instant('giftOnBoard.continue');
        this.button1Action = RoutingTypes.HOME_PUBLIC;
        this.button2Action = RoutingTypes.GIFT;
        // this.button1Action = this.navigateToUrl(RoutingTypes.HOME_PUBLIC);
        // this.button2Action = this.navigateToUrl(RoutingTypes.GIFT);
        break;
      }
      case CartTypes.SINGLE_DONATION: {
        this.url = 'assets/images/svg/globe.svg';
        this.title = this.translate.instant('welcomeOnBoard.title');
        this.subtitle = this.translate.instant('welcomeOnBoard.description');
        this.button1 = this.translate.instant('welcomeOnBoard.share');
        this.button2 = this.translate.instant('welcomeOnBoard.enter');
        this.button1Action = 'share';
        this.button2Action = RoutingTypes.HOME_ADMIN;
        // this.button1Action = this.navigateToUrl('share');
        // this.button2Action = this.navigateToUrl(RoutingTypes.GIFT);
        break;
      }
      case CartTypes.SUBSCRIPTION:
        this.url = 'assets/images/svg/globe.svg';
        this.title = this.translate.instant('welcomeOnBoard.title');
        this.subtitle = this.translate.instant('welcomeOnBoard.description');
        this.button2 = this.translate.instant('welcomeOnBoard.accessYourDashboard');
        this.button2Action = RoutingTypes.LOGIN;
        if (this.route.snapshot.queryParams?.type === UserTypes.individual) {
          this.button1 = this.translate.instant('giftOnBoard.back');
          this.button1Action = RoutingTypes.HOME_PUBLIC;
        } else if (this.route.snapshot.queryParams?.type === UserTypes.business && this.isClimateLeader) {
          this.button1 = this.translate.instant('welcomeOnBoard.inviteYourEmployees');
          this.button1Action = RoutingTypes.ADMIN_SUBSCRIPTIONS;
        }
        break;
    }
  }

  checkCart(type: string): void {
    switch (type) {
      case CartTypes.SINGLE_DONATION: {
        if (this.cartService.getItemsByType(CartTypes.SINGLE_DONATION).length === 0) {
          //this.router.navigate([RoutingTypes.HOME_PUBLIC]).then();
        }
        break;
      }
      case CartTypes.GIFT: {
        if (this.cartService.getItemsByType(CartTypes.GIFT).length === 0) {
          //this.router.navigate([RoutingTypes.GIFT]).then();
        }
        break;
      }
      case CartTypes.SUBSCRIPTION: {
        if (this.cartService.getItemsByType(CartTypes.SUBSCRIPTION).length === 0) {
          //this.router.navigate([RoutingTypes.HOME_PUBLIC]).then();
        }
        break;
      }
    }
  }

  async openAdminPanel(): Promise<any> {
    await this.internalRouter.navigate([RoutingTypes.ADMIN]);
  }

  navigateToUrl1(url: string): any {
    if (url === 'share') {
    } else {
      if (this.button1 === this.translate.instant('welcomeOnBoard.inviteYourEmployees')) {
        const dialogRef = this.dialog.open(InviteEmployeeComponent, {data: this.companyEmployees});
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.router.navigate([RoutingTypes.HOME_ADMIN]).then();
          }
        });
      } else {
        this.router.navigate([url]).then();
      }
    }
  }

  navigateToUrl2(url: string): any {
    this.router.navigate([url]).then();
  }
}
