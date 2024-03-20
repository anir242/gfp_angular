import {AfterViewInit, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {CountersInterface} from '../../../../_models/api/counters-interface';
import {DownloadReportComponent} from '../download-report/download-report.component';
import {environment} from '../../../../../environments/environment';
import {ShareButtonsPopup, SharePopupButtonsDirective, SharePopupComponent} from 'ngx-sharebuttons/popup';
import {ModalComponent} from '../../../../components/modal/modal.component';
import {ShareButtonsDialogComponent} from '../../../../dialogs/share-buttons-dialog/share-buttons-dialog.component';

@Component({
  selector: 'app-your-impact',
  templateUrl: './your-impact.component.html',
  styleUrls: ['./your-impact.component.scss']
})
export class YourImpactComponent extends DownloadReportComponent implements OnInit, AfterViewInit {
  trees: number;
  acres: number;
  @Input() countersInterface: CountersInterface;
  kwh: number;
  @Input() totalCo2: number;
  @Input() co2Certified: number;
  @Input() co2NotCertified: number;
  url = environment.url;
  results: any[];
  colorScheme: any;
  height: number;
  width: number;
  popUpTitle = this.translate.instant('yourImpact.infoTitle');
  popUpBody = this.translate.instant('yourImpact.infoBody');
  popUpCertifiedTitle = this.translate.instant('yourImpact.certifiedTitle');
  popUpCertifiedBody = this.translate.instant('yourImpact.certifiedBody');
  popUpScienceTitle = this.translate.instant('yourImpact.scienceTitle');
  popUpScienceBody = this.translate.instant('yourImpact.scienceBody');
  link = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
   /* this.downloadReport(this.link).then(data => {
      this.link = data;
    });*/
    this.loadChart();
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  loadChart = () => {
    const treeTons = this.roundNumber(
      (this.countersInterface.restoration.certified + this.countersInterface.restoration.notCertified) / 1000);
    const acresTons = this.roundNumber(
      (this.countersInterface.preservation.certified + this.countersInterface.preservation.notCertified) / 1000);
    const kwhTons = this.roundNumber(
      (this.countersInterface.renewable_energy.certified + this.countersInterface.renewable_energy.notCertified) / 1000
    );
    this.trees = this.countersInterface.restoration.unit;
    this.acres = this.countersInterface.preservation.unit;
    this.kwh = this.countersInterface.renewable_energy.unit;
    const total = treeTons + acresTons + kwhTons;
    this.colorScheme = {
      domain: ['#008D5B', '#008781', '#C97658']
    };
    const restoration = this.roundNumber(treeTons / total * 100);
    const preservation = this.roundNumber(acresTons / total * 100);
    const renewable = this.roundNumber(kwhTons / total * 100);
    this.results = [
      {
        name: this.translate.instant('legend.restoration', {value: restoration}),
        value: restoration,
      },
      {
        name: this.translate.instant('legend.preservation', {value: preservation}),
        value: preservation,
      },
      {
        name: this.translate.instant('legend.renewable', {value: renewable}),
        value: renewable,
      }
    ];
  }
}
