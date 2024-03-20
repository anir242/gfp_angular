import {BrowserModule, Meta} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthenticationModule } from './pages/authentications/authentication.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { InfoComponent } from './components/info/info.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import {SharedModule} from './_modules/shared/shared.module';
import {FooterComponent} from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppInjectorService} from './_services/_base/app-injector.service';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ToastrModule} from 'ngx-toastr';
import {AuthGuardService} from './_services/_base/auth-guard.service';
import {JwtModule} from '@auth0/angular-jwt';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {SharedService} from './_services/shared.service';
import {UserLayoutComponent} from './layouts/user-layout/user-layout.component';
import { ShopifyConnectionComponent } from './pages/callback/shopify-connection/shopify-connection.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MatMenuModule} from '@angular/material/menu';
import {SharedDataProjectService} from './_services/projects/shared-data-project.service';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {environment} from '../environments/environment';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from './components/modal/modal.component';
import {LocaleComponent} from './components/locale/locale.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatChipsModule} from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ModalEditComponent} from './components/modal-edit/modal-edit.component';
import {PublicLayoutComponent} from './layouts/public-layout/public-layout.component';
import {BaseComponent} from './pages/_base/base/base.component';
import {PublicNavbarComponent} from './components/navbar-public/public-navbar.component';
import {FooterPublicComponent} from './components/footer-public/footer-public.component';
import {NgxStripeModule} from 'ngx-stripe';
import {GoogleMapsModule} from '@angular/google-maps';
import {BreadcrumbService} from './_services/_base/breadcrumb.service';
import {MatBadgeModule} from '@angular/material/badge';
import {ShareButtonsDialogComponent} from './dialogs/share-buttons-dialog/share-buttons-dialog.component';
import {
  GiftCartPopupComponent
} from './pages/public/pages/gift-public/components/gift-cart-popup/gift-cart-popup.component';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {GiftEditComponent} from './pages/public/dialogs/gift-edit/gift-edit.component';
import {SidebarAccountComponent} from './components/sidebar-account/sidebar-account.component';
import {PixelModule} from 'ngx-pixel';
import {AcceptInviteComponent} from './pages/subscriptions/pages/accept-invite/accept-invite.component';
import { InviteEmployeeComponent } from './components/invite-employee/invite-employee.component';
import { AdminModule } from './pages/admin/admin.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ModalPaymentMethodComponent } from './components/modal-payment-method/modal-payment-method.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PilioModalComponent } from './components/pilio-modal/pilio-modal.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#ffffff',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'ball-spin-clockwise',
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#bebebe',
  fgsPosition: 'center-center',
  fgsSize: 110,
  fgsType: 'three-strings',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#e3e3e3',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    NavbarAuthComponent,
    BaseComponent,
    FooterComponent,
    FooterPublicComponent,
    AdminLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    MenuItemComponent,
    UserLayoutComponent,
    ShopifyConnectionComponent,
    ModalComponent,
    LocaleComponent,
    NotificationsComponent,
    ModalEditComponent,
    ModalPaymentMethodComponent,
    PublicLayoutComponent,
    PublicNavbarComponent,
    ShareButtonsDialogComponent,
    GiftCartPopupComponent,
    GiftEditComponent,
    SidebarAccountComponent,
    AcceptInviteComponent,
    InviteEmployeeComponent,
    WelcomeComponent,
    PilioModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      exclude: ['assets/']
    }),
    ReactiveFormsModule,
    //AuthenticationModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    AngularSvgIconModule.forRoot(),
    MatMenuModule,
    MatDialogModule,
    ScrollingModule,
    MatChipsModule,
    MatStepperModule,
    IvyCarouselModule,
    GoogleMapsModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatTabsModule,
    PixelModule.forRoot({ enabled: environment.pixelEnable, pixelId: '416375406865979' }),
  ],
  providers: [
    AuthGuardService,
    SharedService,
    SharedDataProjectService,
    BreadcrumbService,
    Meta,
    { provide: 'googleTagManagerId', useValue: environment.googleTagManagerId }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
    injector: Injector) {
    AppInjectorService.injector = injector;
  }
}
