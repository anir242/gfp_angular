import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from 'src/app/_services/public/local/tools.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-tools-public',
  templateUrl: './tools-public.component.html',
  styleUrls: ['./tools-public.component.scss']
})
export class ToolsPublicComponent extends BaseComponent implements OnInit {
  @Input() headingText: string;
  @Input() headingDesc: string;
  @Input() buttonTxt: string;
  @Input() fetchData: boolean;
  @Input() customData: [];
  @Input() customBtnStyle: object;
  @Input() business: boolean;

  clientType = 'individual';
  selected: any;
  data;

  constructor(private toolsService: ToolsService) {
    super();
  }

  ngOnInit(): void {
    if (this.fetchData) {
      if (localStorage.getItem('clientType') == '2') {
        this.clientType = 'business';
        this.getData();
      } else {
        this.getDataB2C();
      }
    } else {
      this.setData();
    }
  }

  getData(): void {
    this.toolsService.getData().subscribe((res) => {
      this.data = res;
      if (this.data?.length > 0) {
        this.selected = res[0];
      }
    });
  }

  getDataB2C(): void {
    this.toolsService.getDataB2C().subscribe((res) => {
      this.data = res;
      if (this.data?.length > 0) {
        this.selected = res[0];
      }
    });
  }

  setData(): void {
    this.data = this.customData;
    if (this.data?.length > 0) {
      this.selected = this.data[0];
    }
  }

  routeToCalendly(): void {
    this.identify('Book_demo_website', 'Hubspot');
    window.open(
      'https://page.greenfutureproject.com/meeting-website',
      '_blank'
    );
  }
}
