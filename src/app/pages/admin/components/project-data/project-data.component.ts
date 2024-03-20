import {Component, Input, OnInit} from '@angular/core';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-project-data',
  templateUrl: './project-data.component.html',
  styleUrls: ['./project-data.component.scss']
})
export class ProjectDataComponent extends BaseComponent implements OnInit {
  @Input() slug: string;
  @Input() totalData: any;
  @Input() remainder: any;
  @Input() item: any;
  @Input() popUpBody: string;
  @Input() popUpTitle: string;
  @Input() type: string;
  text: string;
  text2: string;
  text3: string;
  img: string;
  colorScheme: any;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.fillData();
  }

  getColor(): any {
    switch (this.type) {
      case 'renewable':
        this.colorScheme = {
          domain: ['#F4B68C']
        };
        break;
      case 'restoration':
        this.colorScheme = {
          domain: ['#C3E8C1']
        };
        break;
      case 'preservation':
        this.colorScheme = {
          domain: ['#B5E7EA']
        };
        break;
      default:
        this.colorScheme = {
          domain: ['#636363']
        };
        break;
    }
  }

  fillData(): void{
    this.text2 = this.translate.instant('projectDetails.nextCourt');
    this.text3 = this.translate.instant('projectDetails.tennisCourt');
    this.text = this.translate.instant('subscription.treesPlanted');
    if (this.type == 'renewable_energy') {
      this.type = 'renewable';
    }
    switch (this.slug){
      case ProjectTypes.restoration: {
        this.popUpTitle = this.translate.instant('projectDetails.infoTrees');
        this.popUpBody = this.translate.instant('projectDetails.popUpTreesH');
        this.img = 'tennis';
        break;
      }
      case ProjectTypes.marine_restoration: {
        this.text = this.translate.instant('subscription.coralsPlanted');
        this.img = 'marine';
        this.type = 'marine';
        break;
      }
      case ProjectTypes.preservation: {
        this.popUpTitle = this.translate.instant('projectDetails.infoHectares');
        this.popUpBody = this.translate.instant('projectDetails.popUpHectares');
        this.text = this.translate.instant('subscription.hectaresProtected');
        this.img = 'area';
        break;
      }
      case ProjectTypes.renewable_energy: {
        this.img = 'house';
        this.type = 'renewable';
        this.text = this.translate.instant('projectDetails.kw');
        this.text2 = this.translate.instant('projectDetails.nextHouseholds');
        this.text3 = this.translate.instant('projectDetails.householdsPowered');
        break;
      }
      default: {
        this.img = 'flight';
        this.text = this.translate.instant('projectDetails.tonsOffsetted');
        this.text2 = this.translate.instant('projectDetails.nextFlight');
        this.text3 = this.translate.instant('projectDetails.flightsFromRMNY');
      }
    }
    this.getColor();
  }
}
