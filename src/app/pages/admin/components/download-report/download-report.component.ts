import {Component, Inject, OnInit} from '@angular/core';
import {Response} from '../../../../_models/api/response';
import {StorageName} from '../../../../_models/components/storage-name';
import {RoleTypes} from '../../../../_models/components/role-types';
import {ReportsService} from '../../../../_services/reports/reports.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {AppInjectorService} from '../../../../_services/_base/app-injector.service';
import {ShareButtonsDialogComponent} from '../../../../dialogs/share-buttons-dialog/share-buttons-dialog.component';

@Component({
  selector: 'app-download-report',
  template: ''
})
export class DownloadReportComponent extends BaseComponent {
  public reportsService: ReportsService;

  constructor() {
    super();
    this.reportsService = AppInjectorService.injector.get(ReportsService);

  }

  retrieveUrlReport = async () => {
    this.ngxService.start('report');
    const link = await this.downloadReport('');
    this.ngxService.stop('report');
    const dialogRef = this.dialog.open(ShareButtonsDialogComponent, {
      data: {
        url: link,
      }
    });
  };

  downloadReport = async (link?: string) => {
    let response: Response<any>;
    try {
      switch (localStorage.getItem(StorageName.userCompanyRole)) {
        case RoleTypes.COMPANY_OWNER:
        case RoleTypes.COMPANY_ADMIN: {
          response = await this.reportsService.getCompanyReports(localStorage.getItem(StorageName.companyId));
          break;
        }
        default: {
          response = await this.reportsService.getUserReports(localStorage.getItem(StorageName.id));
          break;
        }
      }
      if (response?.success) {
        if (link !== undefined) {
          link = response.data.url;
          return link;
        } else {
          this.router.navigate([]).then(result => {
            window.open(response.data.url, '_blank');
          });
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  };
}
