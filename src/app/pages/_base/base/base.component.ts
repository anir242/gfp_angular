import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppInjectorService } from '../../../_services/_base/app-injector.service';
import Swal from 'sweetalert2';
import { SweetAlertInterface } from '../../../_models/components/sweet-alert';
import { Response } from '../../../_models/api/response';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../_services/shared.service';
import { StorageName } from '../../../_models/components/storage-name';
import { ModalComponent } from '../../../components/modal/modal.component';
import { LocaleComponent } from '../../../components/locale/locale.component';
import { ModalType } from '../../../_models/components/modal-types';
import { RoleTypes } from '../../../_models/components/role-types';
import { ErrorCodes } from '../../../_models/components/error-codes';
import { AlertTypes } from '../../../_models/components/alert-types';
import { environment } from '../../../../environments/environment';
import { ShareFriendsComponent } from '../../../components/share-friends/share-friends.component';
import { OrderSummaryService } from '../../../_services/public/local/order-summary.service';
import { NavItem } from '../../../_models/components/nav-item';
import { Meta } from '@angular/platform-browser';
import { PixelService } from 'ngx-pixel';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { LoggedUserService } from '../../../_services/public/local/logged-user.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ProductInterface } from '../../../_models/product-interface';
// import * as Sentry from '@sentry/browser';
import { CardIconSmallComponent } from '../../public/pages/business-public/components/card-icon-small/card-icon-small.component';

const sidebarProfile = require('src/assets/json/sidebar-profile.json');
const sidebarApp = require('src/assets/json/sidebar-pages.json');
const sidebarSubscription = require('src/assets/json/sidebar-subscription.json');
const menuPublic = require('src/assets/json/sidebar-public.json');

@Component({
  selector: 'app-base',
  template: '',
})

export class BaseComponent implements OnInit {
  protected router: Router;
  public translate: TranslateService;
  protected dialog: MatDialog;
  protected ngxService: NgxUiLoaderService;
  protected toastr: ToastrService;
  protected sharedService: SharedService;
  protected meta: Meta;
  protected pixelService: PixelService;
  protected loggedUserService: LoggedUserService;
  protected gtmService: GoogleTagManagerService;

  sidebarProfile: NavItem[];
  sidebarApp: NavItem[];
  sidebarSubscription: NavItem[];
  menuPublic: NavItem[];

  visible: boolean = false;
  count: number = 0;

  showSettings = environment.showSettings;
  addImpactEnabled = environment.enableImpact;
  shareButtonEnabled = environment.enableShare;

  constructor() {
    this.loggedUserService = AppInjectorService.injector.get(LoggedUserService);
    this.dialog = AppInjectorService.injector.get(MatDialog);
    this.meta = AppInjectorService.injector.get(Meta);
    this.router = AppInjectorService.injector.get(Router);
    this.translate = AppInjectorService.injector.get(TranslateService);
    this.ngxService = AppInjectorService.injector.get(NgxUiLoaderService);
    this.toastr = AppInjectorService.injector.get(ToastrService);
    this.sharedService = AppInjectorService.injector.get(SharedService);
    this.pixelService = AppInjectorService.injector.get(PixelService);
    this.gtmService = AppInjectorService.injector.get(GoogleTagManagerService);
  }

  ngOnInit(): void {
    this.menuPublic = menuPublic;
    this.sidebarProfile = sidebarProfile;
    this.sidebarApp = sidebarApp;
    this.sidebarSubscription = sidebarSubscription;
  }

  logError = (e: any) => {
    console.error(e);
  }

  logout = async (route: string = '/') => {
    localStorage.removeItem(StorageName.token);
    localStorage.removeItem(StorageName.companyId);
    localStorage.removeItem(StorageName.userCompanyRole);
    localStorage.removeItem(StorageName.id);
    localStorage.removeItem(StorageName.subscriptionId);
    localStorage.removeItem(StorageName.username);
    localStorage.removeItem(StorageName.cart);
    this.loggedUserService.logout.emit();
    await this.router.navigate([route]);
  }

  showError = (message: string, title: string) => {
    console.log('error')
    console.log(message, title)
    const toast = this.toastr.error(
      message,
      title,
      {
        closeButton: true,
        toastClass: 'alert alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
    toast.onHidden = this.onClose()
  }

  showErrorResponse = (response: Response<any>, from = 'top', align = 'right') => {
    //console.log(response)
    // Sentry.captureException(response);
    let unexpected = false;
    let message = '';
    let title = '';
    let toastClass = 'alert alert-with-icon';
    switch (response?.code) {
      case ErrorCodes.INCORRECT_PASSWORD:
        message = this.translate.instant('authentication.incorrectPassword');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.USER_ALREADY_EXIST:
        message = this.translate.instant('authentication.userAlreadyExist');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.USER_NOT_FOUND:
        message = this.translate.instant('authentication.userNotFound');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.GIFT_CARD_ALREADY_REDEEMED:
        message = this.translate.instant('authentication.giftCardAlreadyRedeemed');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.NOT_AUTHORIZED:
        message = this.translate.instant('authentication.notAuthorized');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.USER_CREATED:
        message = this.translate.instant('authentication.created');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.DELETED_ACCOUNT:
        message = this.translate.instant('authentication.deletedAccount');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.PROJECT_NOT_FOUND:
        message = this.translate.instant('authentication.projectNotFound');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.SUBSCRIPTION_NOT_FOUND:
        message = this.translate.instant('authentication.subscriptionNotFound');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.ALREADY_EMPLOYEE:
        message = this.translate.instant('authentication.alreadyEmployee');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.success:
        message = this.translate.instant('authentication.success');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.INVALID_DATA:
        message = this.translate.instant('authentication.invalidData');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.INVALID_TOKEN:
        message = this.translate.instant('authentication.invalidToken');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.NO_TOKEN_PROVIDE:
        message = this.translate.instant('authentication.noTokenProvide');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.RESOURCE_ALREADY_EXISTS:
        message = this.translate.instant('authentication.resourceAlreadyExists');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.PERMISSION_ALREADY_EXISTS:
        message = this.translate.instant('authentication.permissionAlreadyExists');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.COMPANY_BILLING_ADDRESS_NOT_CREATED:
        message = this.translate.instant('authentication.companyBillingAddressNotCreated');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.COMPANY_ADDRESS_NOT_CREATED:
        message = this.translate.instant('authentication.companyAddressNotCreated');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.COMPANY_NOT_CREATED:
        message = this.translate.instant('authentication.companyNotCreated');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.SUBSCRIPTION_NOT_CREATED:
        message = this.translate.instant('authentication.subscriptionNotCreated');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.USER_NOT_HAVE_SUBSCRIPTION:
        message = this.translate.instant('errorCodeMessages.userNotHaveSubscription');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.PROMO_CODE_ALREADY_USED:
        message = this.translate.instant('errorCodeMessages.promoCodeAlreadyUsed');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.PROMO_CODE_NOT_FOUND:
        message = this.translate.instant('errorCodeMessages.promoCodeNotFound');
        title = this.translate.instant('warning');
        break;
      case ErrorCodes.NEWSLETTER_USER_ALREADY_EXISTS:
        message = this.translate.instant('errorCodeMessages.newsletterUserAlreadyExists');
        title = this.translate.instant('warning');
        break;
      default:
        message = this.translate.instant('unexpectedError');
        title = this.translate.instant('warning');
        unexpected = true;
        this.count += 1;
        toastClass += ' unexpected'
        break;
    }
    if (!this.visible && this.count <= 1) {
      const toast = this.toastr.error(
        message,
        title,
        {
          closeButton: true,
          toastClass: toastClass,
          positionClass: 'toast-' + from + '-' + align,
        }
      );
      this.visible = unexpected;
      toast.onHidden = this.onClose();
    }
  }

  onClose(): Observable<void> {
    this.visible = false;
    return new Observable<void>();
  }

  showAlert = (
    {
      text,
      title,
      type,
      icon,
      timer,
      cancelButtonText,
      confirmButtonText
    }: SweetAlertInterface): Promise<any> => {

    if (type === AlertTypes.basic) {
      return Swal.fire({
        heightAuto: false,
        title,
        customClass: {
          confirmButton: 'mat-raised-button mat-button-base mat-success'
        },
      });
    } else if (type === AlertTypes.titleAndText) {
      return Swal.fire({
        heightAuto: false,
        title,
        text,
        customClass: {
          confirmButton: 'mat-button'
        }
      });
    } else if (type === AlertTypes.successMessage) {
      return Swal.fire({
        heightAuto: false,
        title,
        text,
        customClass: {
          confirmButton: 'mat-raised-button mat-button-base mat-success'
        },
        icon
      });
    } else if (type === AlertTypes.warningConfirmation) {
      return Swal.fire({
        heightAuto: false,
        title,
        text,
        showCancelButton: true,
        customClass: {
          confirmButton: 'mat-raised-button mat-button-base mat-success',
          cancelButton: 'mat-raised-button mat-button-base mat-warning',
        },
        confirmButtonText,
        icon
      });
    } else if (type === AlertTypes.warningCancel) {
      return Swal.fire({
        heightAuto: false,
        title,
        text,
        showCancelButton: true,
        customClass: {
          confirmButton: 'mat-raised-button mat-button-base mat-success mr-1',
          cancelButton: 'mat-raised-button mat-button-base mat-warning',

        },
        confirmButtonText,
        cancelButtonText,
        icon
      });
    } else if (type === AlertTypes.autoClose) {
      return Swal.fire({
        heightAuto: false,
        title,
        text,
        showConfirmButton: false,
        timer
      });
    }
  }

  openModal = (
    modalTitle: string,
    type: string = typeof ModalType,
    // types: 'small' | 'medium' | 'large',
    primaryText: string,
    secondaryText?: string,
    seeAction?: boolean,
    action?: () => void,
    buttonLabel?: string,
    buttonCancelLabel?: string
  ) => {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: modalTitle,
        size: type,
        firstText: primaryText,
        secondText: secondaryText,
        showAction: seeAction,
        buttonText: buttonLabel,
        buttonCancelLabel: buttonCancelLabel
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        action();
      }
    });
  }

  openLocale = (
    modalTitle: string,
    type: string = typeof ModalType,
    // types: 'small' | 'medium' | 'large',
    primaryText: string,
    secondaryText?: string,
    seeAction?: boolean,
    action?: (data) => void,
    buttonLabel?: string
  ) => {
    const dialogRef = this.dialog.open(LocaleComponent, {
      data: {
        title: modalTitle,
        size: type,
        firstText: primaryText,
        secondText: secondaryText,
        showAction: seeAction,
        buttonText: buttonLabel
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        action(result.data);
      }
    });
  }

  showSuccess = (message: string, title: string) => {
    this.toastr.success(
      message,
      title,
      {
        closeButton: true,
        toastClass: 'alert alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }

  canSeeCompanyData(): boolean {
    const companyRoles = [RoleTypes.COMPANY_OWNER, RoleTypes.COMPANY_ADMIN];
    return companyRoles.includes(localStorage.getItem(StorageName.userCompanyRole));
  }

  roundNumber(val: number, approximation = 2): number {
    const app = 10 ** approximation;
    return Math.round(val * app) / app;
  }

  showCustomAlert(route: ActivatedRoute, title: string, type: string): void {
    if (route.snapshot.queryParams?.invited) {
      this.showAlert({
        title: this.translate.instant(title),
        text: this.translate.instant(type),
        type: AlertTypes.titleAndText
      }).then();
    }
    this.router.navigate([], {
      queryParamsHandling: 'preserve',
    }).then();
  }

  validateEmail(email): any {
    const chars = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return chars.test(String(email).toLowerCase());
  }

  retrieveStyleBackgroundPublic(img: string): any {
    if (!img) {
      return {
        'background': '#ccc'
      }
    }
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%',
      'background-opacity': '0.8'
    };
  }

  scrollToId(id: string): void {
    if (id) {
      const yOffset = -56;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  getPreservationValue(data: number): any {
    if (data >= 1) {
      if (data == 1) {
        return this.translate.instant('orderSummary.hectareUnit', {value: data});
      }
      return this.translate.instant('orderSummary.hectaresUnit', {value: this.roundNumber(data, 5)});
    }
    return this.translate.instant('orderSummary.m2Unit', {value: this.roundNumber(data * 10000)});
  }

  goTo(url: string): void {
    this.router.navigate([url]).then();
  }

  routeToCalendly(): void {
    this.identify('book_demo', 'Calendly');
    window.open('https://calendly.com/green-future-project', '_blank')
  }

  asProduct(
    id: string, name: string, currency: string, price: number, quantity: number,
    variant: string, category: string, subcategory?: string, listId?: string, listName?: string
  ): ProductInterface {
    const product: ProductInterface = {
      item_id: id,
      item_name: name,
      item_brand: 'Green Future Project',
      index: 0,
      item_category: category,
      item_category2: subcategory,
      item_variant: variant,
      currency: currency,
      price: price,
      quantity: quantity,
      item_list_id: listId,
      item_list_name: listName
    }
    return product;
  }

  identify(event: string, method: string): void {
    const gtmTag = {
      event: event,
      method: method
    };
    if (!environment.production) {
      console.log(gtmTag);
    }
    this.gtmService.pushTag(gtmTag);
  }

  track(
    event: string, products: ProductInterface[]
  ): void {
    this.gtmService.pushTag({ecommerce: null});
    const gtmTag = {
      event: event,
      ecommerce : {
        items: products
      }
    };
    if (!environment.production) {
      console.log(gtmTag)
    }
    this.gtmService.pushTag(gtmTag);
  }

  trackPurchase(
    id: string, value: number, tax: number, shipping: number, currency: string,
    products: ProductInterface[]
  ): void {
    let productIds = [];
    products?.forEach((product) => {
      productIds.push(product.item_id)
    });
    this.gtmService.pushTag({ecommerce: null});
    const gtmTag = {
      event: 'purchase',
      ecommerce : {
        transaction_id: id,
        value: value,
        tax: tax,
        shipping: shipping,
        currency: currency,
        items: products
      },
      facebook: {
        content_type: 'product',
        content_ids: productIds
      }
    };
    if (!environment.production) {
      console.log(gtmTag)
    }
    this.gtmService.pushTag(gtmTag);
  }

  calculateCo2Trees = (quantity: number, interval: number, co2KgPerUnit: number, date: Date): number => {
    /* Calclulate the CO2 absorbed from trees planted over time */
    const date1 = new Date(date);
    const date2 = new Date();
    let co2 = 0;
    const currentDate = date2.getDate();
    const rolloverDate = date1.getDate();
    let diffMonth = (
      (date2.getFullYear() - date1.getFullYear()) * 12 + 
      date2.getMonth() - date1.getMonth()
    );
    if (currentDate < rolloverDate && diffMonth > 0) {
      diffMonth -= 1;
    }
    for (let i = 0; i <= diffMonth + 1; i++) {
      if (interval > 0) {
        co2 += interval * co2KgPerUnit * i;
      } else {
        if (diffMonth != 0 || i != 0) {
          co2 += quantity * co2KgPerUnit;
        }
      }
    }
    return co2;
  };

}
