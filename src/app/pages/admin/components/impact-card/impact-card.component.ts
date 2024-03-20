import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { CounterValues } from 'src/app/_models/components/counter-values';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { ImpactCardService } from 'src/app/_services/impact-card/impact-card.service';
import { ShareButtonsDialogComponent } from 'src/app/dialogs/share-buttons-dialog/share-buttons-dialog.component';
import { environment } from 'src/environments/environment';

export interface UploadUrlResponse {
  data: {
    url: string,
    key: string
  },
  success: boolean
}

@Component({
  selector: 'app-impact-card',
  templateUrl: './impact-card.component.html',
  styleUrls: ['./impact-card.component.scss']
})
export class ImpactCardComponent extends BaseComponent implements OnInit {
  @Input() impactType: string;
  @Input() hectares: any;
  @Input() co2: any;
  @Input() trees: number;
  @Input() kwh: number;
  @Input() co2NotCertified: number;
  @Input() co2Certified: number;

  lines: string[];
  tennisCourts: number;
  flights: number;
  households: number;
  dialogData: any;
  downloadClicked: boolean = false;
  shareClicked: boolean = false;
  filename: string;
  uploadURL: any;
  awsObjectKey: string;
  filenames:any[]= [{file:'carbon_offset.jpeg'},{file:'restoration.jpeg'}, {file:'preservation.jpeg'},{file:'renewable_energy.jpeg'}, {file:'total_Summary.jpeg'}]
  windowWidth:any = window.innerWidth
  
  constructor(@Inject(MAT_DIALOG_DATA) public dialogTypeData: any, private impactCardService: ImpactCardService) {
    super();
    this.dialogData = dialogTypeData;
  }

  ngOnInit(): void {
    if (this.dialogData && this.dialogData.type) {
      this.impactType = this.dialogData.type;
    }
    this.hectares = this.convertAreaUnits(this.dialogData?.hectares);
    this.co2 = this.convertCo2Units(this.dialogData?.co2);
    this.trees = this.dialogData?.trees;
    this.kwh = this.dialogData?.kwh;
    this.co2Certified = this.dialogData?.co2Certified
    this.co2NotCertified = this.dialogData?.co2NotCertified
    if (this.impactType === 'preservation') {
      this.tennisCourts = this.roundNumber(this.dialogData.hectares * CounterValues.hectare_tennisCourt);
    } else {
      this.tennisCourts = this.roundNumber(this.trees * CounterValues.tree_tennisCourt);
    }
    this.flights = Math.round(this.dialogData.co2 * CounterValues.tonne_flight);
    this.households = this.roundNumber(this.kwh * CounterValues.kw_household);
    this.filename = this.impactType + '.jpeg';
    this.impactCardService.getUploadUrl().then((response: UploadUrlResponse) => {
      this.uploadURL = response.data.url;
      this.awsObjectKey = response.data.key;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  async downloadAll() {
    document.querySelectorAll('#impact_card').forEach((node: any, i: number) => {
      const filename = this.filenames[i].file;
      this.downloadClicked = true;
      this.domToBase64(node).then((dataUrl) => {
        const url = document.createElement('a');
        url.download = filename;
        url.href = dataUrl;
        url.click();
        this.downloadClicked = false;
      });
    });
  }

  async download(filename:string, id:number) {
    this.downloadClicked = true;
    let node: any = document.querySelectorAll('#impact_card');
    this.domToBase64(node[id]).then((dataUrl) => {
      let url = document.createElement('a');
      url.download = filename;
      url.href = dataUrl;
      url.click();
    }).then(() => {
      this.downloadClicked = false;
    })
}

  async share() {
    const filename = this.filename;
    this.shareClicked = true;
    let node: HTMLElement = document.querySelector('#impact_card');
    const file = await this.domToBase64(node).then(async (dataUrl) => {
      return await fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => new File([blob], filename ,{ type: "image/jpeg" }))
    });
    await this.impactCardService.uploadImage(this.uploadURL, file).then((response) => {
      this.dialog.open(ShareButtonsDialogComponent, {
        data: {
          url: `${environment.awsBaseUrl}/${this.awsObjectKey}`,
        }
      });
    }).then(() => {
      this.shareClicked = false;
    })
  }

  private async domToBase64(node: any) {
    const scale = 2;
    return await domtoimage.toJpeg(node, { 
      width: node.clientWidth*scale, 
      height: node.clientHeight*scale, 
      style: {
        transform: 'scale('+scale+')',
        transformOrigin: 'top left'
      } 
    })
  }

  private convertCo2Units(co2: number): any {
    if(co2 < 1.0){
      return { unit: 'kg', value: co2 * 1000 }
    }else{
      return { unit: 'tonne', value: co2 }
    }
  }

  private convertAreaUnits(area: number): any {
    if(area < 0.5){
      return { unit: 'm2', value: area * 10000 }
    }else{
      return { unit: 'ha', value: area }
    }
  }
}
