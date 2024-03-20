import {Component, Input, OnInit} from '@angular/core';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {CountersInterface} from '../../../../_models/api/counters-interface';
import {CountersDataInterface} from '../../../../_models/api/counters-data-interface';
import {CounterValues} from '../../../../_models/components/counter-values';
import {DownloadReportComponent} from '../download-report/download-report.component';
import {environment} from '../../../../../environments/environment';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import { ImpactCardComponent } from '../impact-card/impact-card.component';

@Component({
    selector: 'app-real-data',
    templateUrl: './real-data.component.html',
    styleUrls: ['./real-data.component.scss']
})
export class RealDataComponent extends DownloadReportComponent implements OnInit {
    @Input() type: string;
    @Input() countersInterface: CountersInterface;
    @Input() totalCo2: number;
    @Input() co2Certified: number;
    @Input() co2NotCertified: number;
    @Input() name: string;
    @Input() id: string;
    @Input() hectares: number;
    @Input() kwh: number;
    @Input() trees: string;
    

    countersData: CountersDataInterface;
    projectTypes = ProjectTypes;
    url = environment.url;
    clicked: boolean = false;
    value = 0;
    filename: string;
    cleanName: string;

    constructor(public dialog: MatDialog) {
      super();
    }

    ngOnInit(): void {
      this.cleanName = this.name.replace("'s", "");
      this.filename = this.cleanName + '-data-' + this.type + '.png';
      if (this.type === ProjectTypes.preservation) {
        this.countersData = this.countersInterface.preservation;
        this.value = this.roundNumber(this.countersData?.unit * CounterValues.hectare_tennisCourt);
      }
      if (this.type === ProjectTypes.restoration) {
        this.countersData = this.countersInterface.restoration;
        this.value = this.roundNumber(this.countersData?.unit * CounterValues.tree_tennisCourt);
      }
      if (this.type === ProjectTypes.renewable_energy) {
        this.countersData = this.countersInterface.renewable_energy;
        this.value = this.roundNumber(this.countersData?.unit * CounterValues.kw_household);
      }
    }

    openImpactPreview = () => {
      this.dialog.open(ImpactCardComponent, { data: { type: this.type, co2: this.totalCo2, hectares: this.hectares, trees: this.trees, kwh: this.kwh, co2NotCertified: this.co2NotCertified, co2Certified: this.co2Certified }});
    }
}
