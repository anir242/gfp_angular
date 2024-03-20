import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../_base/base/base.component';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthenticationService} from '../../../_services/authentication/authentication.service';
import {Response} from '../../../_models/api/response';
import {LoginInterface} from '../../../_models/api/login-interface';
import {StorageName} from '../../../_models/components/storage-name';
import {Subscription} from 'rxjs';
import {AppComponent} from '../../../app.component';
import {ActivatedRoute} from '@angular/router';
import {RoutingTypes} from '../../../_models/components/routing-types';
import {GiftService} from '../../../_services/public/gift.service';
import {GiftCardInterface} from '../../../_models/api/public/gift-card-interface';
import {GiftCardRecipientInterface} from '../../../_models/api/public/gift-card-recipient-interface';
import {LoggedUserService} from '../../../_services/public/local/logged-user.service';
import {ErrorCodes} from '../../../_models/components/error-codes';
import {UserTypes} from '../../../_models/components/user-types';
import {FlowTypes} from '../../../_models/components/flow-types';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../_services/_base/auth.service';
import { UsersService } from 'src/app/_services/users/users.service';
import { NewsletterService } from 'src/app/_services/public/newsletter.service';
import { TagTypes } from 'src/app/_models/components/tag-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  @ViewChild('submit', {static: true}) submit: MatButton;
  planId: string;
  projectSlug: string;
  routingTypes = RoutingTypes;
  isLoggedin: boolean;
  giftCardRecipientInterface: GiftCardRecipientInterface;
  giftCardInterface: GiftCardInterface;
  bannerData: { value: number, type: string, action: string, location: string };
  subscriptionData = new UntypedFormGroup({
    user: new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
      ]),
    }),
    remember: new UntypedFormControl(false)
  });
  private fromWhichFlow: string;
  private slug: string;
  private type: string;

  userType: string;
  UserTypes: any;

  giftToken: string;
  showSocials = environment.showSocialsLogin;
  auth2: any;
  google: any;
  id: string;
  name: string;
  email: string;
  token: string;
  image: string;

  constructor(
    private giftService: GiftService,
    public route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    public auth: AuthService,
    private userService: UsersService,
    private newsletterService: NewsletterService,
  ) {
    super();
    this.UserTypes = UserTypes;
  }

  ngOnInit(): void {
    this.getGiftCardUsers().then();
    this.getQueryParams();
    this.showCustomAlert(this.route, 'share.inviteAccepted', 'share.login');
    this.isLoggedIn();
  }

  async isLoggedIn(): Promise<void> {
    if (this.auth.isAuthenticated()) {
      if (this.giftToken) {
        await this.userService.redeemGifts();
        const firstName = this.giftCardRecipientInterface.recipientName.split(' ')[0];
        const lastName = this.giftCardRecipientInterface.recipientName.split(' ')[1];
        this.subscribeToMailchimp(this.giftCardRecipientInterface.recipientEmail, firstName, lastName, [TagTypes.RECEIVER]);
      }
      this.router.navigate([RoutingTypes.ADMIN]);
    }
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromWhichFlow = params.from;
      this.type = params.type;
      switch (this.fromWhichFlow) {
        case FlowTypes.subscriptions:
          switch (this.type) {
            case UserTypes.individual:
              this.userType = UserTypes.individual;
              this.slug = params.slug;
              break;
            case UserTypes.business:
              this.userType = UserTypes.business;
              this.slug = params.slug;
              break;
            default:
              this.userType = UserTypes.individual;
              break;
          }
          break;

        case FlowTypes.singleDonation:
          this.planId = params.id;
          this.projectSlug = params.slug;
          break;

        default:
          if (params.giftToken) {
            this.giftToken = params.giftToken;
          }
          this.userType = UserTypes.individual;
          break;
      }
    });
  }

  subscribeToMailchimp = async (email: string, fname: string, lname: string,tags: string[]) => {
    const params: any = {
      email: email,
      tags: tags,
      firstName: fname,
      lastName: lname,
    };
    try {
      const response: Response<any> =
        await this.newsletterService.subscribeNewsletter(params);
      if (response?.success) {
        this.showSuccess(
          this.translate.instant('authentication.giftRedeemedDescription'),
          this.translate.instant('authentication.giftRedeemedTitled')
        );
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };

  signUp = async () => {
    switch (this.fromWhichFlow) {
      case FlowTypes.subscriptions:
        await this.router.navigate([RoutingTypes.REGISTER], {
          queryParams: {
            type: this.type,
            from: this.fromWhichFlow,
            slug: this.slug
          }
        });

        break;
      case FlowTypes.singleDonation:
        await this.router.navigate([RoutingTypes.REGISTER], {
          queryParams: {
            from: this.fromWhichFlow,
            id: this.planId,
            slug: this.projectSlug,
          }
        });
        break;
      default:
        if (this.giftToken) {
          await this.router.navigate([RoutingTypes.REGISTER], {queryParams: {giftToken: this.giftToken}});
        }else{
          await this.router.navigate([RoutingTypes.REGISTER])
        }
        this.userType = UserTypes.individual;
        break;
    }
  }

  login = async () => {
    this.submit.disabled = true;
    if (this.user.valid) {
      this.ngxService.start();
      try {
        const response: Response<LoginInterface> = await this.authenticationService.login(this.user.value);
        this.ngxService.stop();
        if (response?.success === true) {
          const subs = localStorage.getItem(StorageName.businessEmployees);
          const subsPioneer = localStorage.getItem(StorageName.businessPioneer);
          const termly = localStorage.getItem('TERMLY_API_CACHE')
          localStorage.clear();
          localStorage.setItem('TERMLY_API_CACHE', termly);
          localStorage.setItem(StorageName.userData, JSON.stringify({firstName: response.data.firstname, lastName: response.data.lastname, email: response.data.email}));
          localStorage.setItem(StorageName.token, response.data.token);
          localStorage.setItem(StorageName.id, response.data.id);
          localStorage.setItem(StorageName.username, response.data.firstname);
          localStorage.setItem(StorageName.pilioLastAccess, response.data.pilioLastAccess?.toString());
          let clientType = '1';
          if (response.data?.type == UserTypes.business) {
            clientType = '2';
          }
          localStorage.setItem(StorageName.clientType, clientType);
          // Send GTM event
          this.identify('login', 'GFP');
          if (this.giftToken) {
            await this.userService.redeemGifts();
            this.subscribeToMailchimp(response.data.email, response.data.firstname, response.data.lastname, [TagTypes.RECEIVER])
          }
          switch (this.fromWhichFlow) {
            case FlowTypes.subscriptions:
              const user = response.data;
              localStorage.setItem(StorageName.businessEmployees, subs);
              localStorage.setItem(StorageName.businessPioneer, subsPioneer);
              if (user?.type === this.type) {
                if (this.type === UserTypes.individual) {
                  await this.router.navigate([RoutingTypes.INDIVIDUAL_CHECKOUT.replace(':id', this.slug)]);
                } else {
                  await this.router.navigate([RoutingTypes.BUSINESS_CHECKOUT.replace(':id', this.slug)]);
                }
              } else {
                this.showError(
                  this.translate.instant('signup.subscriptionWarnType'),
                  this.translate.instant('warning'),
                );
                const clientType = localStorage.getItem('clientType');
                const termly = localStorage.getItem('TERMLY_API_CACHE')
                localStorage.clear();
                localStorage.setItem('clientType', clientType)
                localStorage.setItem('TERMLY_API_CACHE', termly);
              }
              break;
            case FlowTypes.singleDonation:
              await this.router.navigate([RoutingTypes.PROJECTS_PUBLIC, this.projectSlug, RoutingTypes.SINGLE_DONATIONS], {queryParams: {id: this.planId}});
              break;
            default:
              await this.router.navigate([this.routingTypes.ADMIN]);

              break;
          }
          this.loggedUserService.logged.emit();
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.ngxService.stop();
        this.logError(e);
        this.showErrorResponse(e);
      }
    }
    this.submit.disabled = false;
  }

  get user(): UntypedFormGroup {
    return this.subscriptionData.get('user') as UntypedFormGroup;
  }

  /*  get email(): any {
      return this.user.get('email');
    }

    get password(): any {
      return this.user.get('password');
    }*/

  async getGiftCardUsers(): Promise<void> {
    // const token = this.route.snapshot.queryParams.giftToken;
    if (this.giftToken) {
      try {
        const response: Response<GiftCardRecipientInterface> = await this.giftService.getGiftCardUsers(this.giftToken);
        if (response?.success) {
          this.giftCardRecipientInterface = response.data;
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        if (e.code === ErrorCodes.USER_NOT_FOUND) {
          await this.router.navigate([RoutingTypes.REGISTER], {
            queryParams: {
              giftToken: this.giftToken
            }
          });
        } else {
          this.showErrorResponse(e);
        }
      }
    }
  }

  loginSocial = async (params:any) => {
    try {
      const response: Response<any> = await this.authenticationService.loginSocial(params);
      if (response?.success) {
        localStorage.setItem(StorageName.token, response.data.token);
        localStorage.setItem(StorageName.id, response.data.id);
        await this.router.navigate([this.routingTypes.ADMIN]);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  authGoogle() {
    this.auth2.attachClickHandler(this.google, {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        

        if (profile) {
          const params = {
            provider: 'google',
            name: profile.getName(),
            email: profile.getEmail(),
            idToken: googleAuthUser.getAuthResponse().id_token
          };
          this.loginSocial(params);
        }

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  setupGoogle() {
    this.google = document.getElementById('google');
    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: environment.googleClientId,
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.authGoogle();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }
}
