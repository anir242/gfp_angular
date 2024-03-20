import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {CompanyEmployeesInterface} from '../../../../_models/api/companies/company-employees-interface';
import {SubscriptionsService} from '../../../../_services/subscriptions/subscriptions.service';
import {AppInjectorService} from '../../../../_services/_base/app-injector.service';
import {Response} from '../../../../_models/api/response';
import {StorageName} from '../../../../_models/components/storage-name';

@Component({
  selector: 'app-subscription-info',
  template: ''
})
export class SubscriptionInfoComponent extends BaseComponent implements OnInit {
  protected companyEmployees: CompanyEmployeesInterface[] = [];
  protected subscriptionsService: SubscriptionsService;
  totalEmployees: number;

  constructor() {
    super();
    this.subscriptionsService = AppInjectorService.injector.get(SubscriptionsService);
  }

  ngOnInit(): void {
  }

}
