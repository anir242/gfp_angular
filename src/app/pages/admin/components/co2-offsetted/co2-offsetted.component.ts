import {Component, Input, OnInit} from '@angular/core';
import {DownloadReportComponent} from '../download-report/download-report.component';
import {environment} from '../../../../../environments/environment';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {MatDialog} from '@angular/material/dialog';
import { ImpactCardComponent } from '../impact-card/impact-card.component';

@Component({
  selector: 'app-co2-offsetted',
  templateUrl: './co2-offsetted.component.html',
  styleUrls: ['./co2-offsetted.component.scss']
})
export class Co2OffsettedComponent extends DownloadReportComponent implements OnInit {
  @Input() totalCo2: number;
  @Input() co2Certified: number;
  @Input() co2NotCertified: number;
  @Input() name: string;
  @Input() id: string;
  @Input() hectares: number;
  @Input() kwh: number;
  @Input() trees: string;
  @Input() public: boolean = false;
  kmRomeNewYork = 6883.87;
  tonsCo2Km = 6700;
  url = environment.url;
  clicked: boolean = false;
  flights = 0;
  filename: string;
  cleanName: string;

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.flights = Math.round(this.totalCo2 * this.tonsCo2Km / this.kmRomeNewYork);
    this.cleanName = this.name.replace("'s", "");
    this.filename = this.cleanName + '-CO2-Offset.png';
  }

  openImpactPreview = () => {
    this.dialog.open(ImpactCardComponent, {
      data: { type: 'carbon_offset', co2: this.totalCo2, hectares: this.hectares, trees: this.trees, kwh: this.kwh, co2Certified: this.co2Certified, co2NotCertified: this.co2NotCertified }
    });
  }
}
