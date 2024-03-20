import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../_base/base/base.component';
import { CompanyInterface } from '../../../../_models/api/companies/company-interface';
import { StorageName } from '../../../../_models/components/storage-name';
import { ModalType } from '../../../../_models/components/modal-types';
import { Response } from "../../../../_models/api/response";
import { ClimatePioneerTypes } from "../../../../_models/components/climate-pioneer-types";
import { SubscriptionsInterface } from "../../../../_models/api/subscriptions/subscriptions-interface";
import { CompanyService } from "../../../../_services/companies/company.service";
import { SubscriptionTypes } from "../../../../_models/components/subscription-types";
import { HttpClient } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatCheckbox } from '@angular/material/checkbox';
import { RoutingTypes } from 'src/app/_models/components/routing-types';

@Component({
  selector: 'app-api-widget',
  templateUrl: './api-widget.component.html',
  styleUrls: ['./api-widget.component.scss']
})
export class ApiWidgetComponent extends BaseComponent implements OnInit {
  filePath: string;
  html: string = '';
  companyInterface: CompanyInterface;
  @Input() isLight: boolean;
  @Input() isVertical: boolean;
  @Input() isAnimated: boolean;

  constructor(
    private http: HttpClient,
    private clipboard: Clipboard,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.filePath = '/assets/files/widget/widget.html';
    this.getHtml().then(() => {
      this.getCompany().then();
    });
  }

  renderWidget(data) {
    this.html = data;
  }

  getHtml = async () => {
    await this.http.get(this.filePath, { responseType: 'text' })
      .subscribe(data => this.renderWidget(data));
  }

  getCompany = async () => {
    const companyId = localStorage.getItem(StorageName.companyId);
    const companyResponse: Response<CompanyInterface> = await this.companyService.getCompanyById(companyId);
    try {
      if (companyResponse?.success) {
        this.companyInterface = companyResponse.data;
        if (this.companyInterface) {
          localStorage.setItem(StorageName.companyId, this.companyInterface.id);
          if (this.html) {
            this.html = this.html.replace('###NAME###', this.companyInterface.name);
            this.html = this.html.replace('###ID###', this.companyInterface.id);
            if (this.companyInterface.slug) {
              this.html = this.html.replaceAll('###URL###', 'https://greenfutureproject.com/company/' + this.companyInterface.slug);
            } else {
              this.html = this.html.replaceAll('###URL###', 'https://greenfutureproject.com');
            }
          } else {
            this.html = '';
          }
        } else {

        }
      } else {
        this.showErrorResponse(companyResponse);
        await this.router.navigate([RoutingTypes.ADMIN_SUBSCRIPTIONS]);
      }
    } catch (e) {
      this.showErrorResponse(e);
      await this.router.navigate([RoutingTypes.ADMIN_SUBSCRIPTIONS]);
    }

  }

  updateClass(val, className) {
    const widget = document.querySelector('.gfp-widget');
    let firstSplit = this.html.split('div class="gfp-widget');
    const beforeText = firstSplit[0];
    let afterText = firstSplit[1];
    let secondSplit = firstSplit[1].split('"');
    let classes = secondSplit[0];
    afterText = afterText.substring(classes.length);
    if (val) {
      if (!classes.match(className)) {
        classes += " " + className;
      }
      if (widget) {
        widget.classList.add(className);
      }
    }
    else {
      classes = classes.replace(" " + className, "");
      if (widget) {
        widget.classList.remove(className);
      }
    }
    classes = 'div class="gfp-widget' + classes;
    this.html = beforeText + classes + afterText;
  }

  updateLight(element: any) {
    this.updateClass(element.checked, "light");
  }

  updateVertical(element: any) {
    this.updateClass(element.checked, "vertical");
  }

  updateAnimated(element: any) {
    this.updateClass(element.checked, "animated");
  }

  copyHtml() {
    this.clipboard.copy(this.html);
  }

  //get isLight(): any {
  //  return this.form.get('isLight');
  //}

  //get isAnimated(): any {
  //  return this.form.get('isAnimated');
  //}

  //get isVertical(): any {
  //  return this.form.get('isVertical');
  //}
}
