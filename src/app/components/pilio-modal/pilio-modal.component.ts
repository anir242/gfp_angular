import { Component, OnInit, Input } from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';
import { environment } from 'src/environments/environment';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {AuthService} from '../../_services/_base/auth.service';
import {Response} from '../../_models/api/response';
import {StorageName} from '../../_models/components/storage-name';
import {RoutingTypes} from '../../_models/components/routing-types';


@Component({
  selector: 'app-pilio-modal',
  templateUrl: './pilio-modal.component.html',
  styleUrls: ['./pilio-modal.component.scss']
})
export class PilioModalComponent extends BaseComponent implements OnInit {
  isChecked:boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private authService: AuthService
  ) {
    super();
   }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
    }
  }

  toggle(e): void{
    this.isChecked = !this.isChecked 
  }

  goToPilio = async () => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const email = JSON.parse(userData).email;
        if (email) {
          const response: Response<any> = await this.authenticationService.loginPilio(email);
          if (response?.success) {
            const token = response.data.token;
            if (token) {
              await this.router.navigate([environment.pilioLoginUrl], {queryParams: {
                token: token
              }});
            }
          } else {
            this.showErrorResponse(response);
          }
        }
      }
    } catch (e) {
      this.showErrorResponse(e);
    }  
  }
}
