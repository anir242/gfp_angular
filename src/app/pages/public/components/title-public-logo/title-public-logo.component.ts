import { Component, OnInit } from '@angular/core';
import { PartnersPublicService } from 'src/app/pages/public/pages/partners-public/partners-public.service';

@Component({
  selector: 'app-title-public-logo',
  templateUrl: './title-public-logo.component.html',
  styleUrls: ['./title-public-logo.component.scss']
})
export class TitlePublicLogoComponent implements OnInit {

  partners: any;

  constructor(
    private partnersPublicService: PartnersPublicService
  ) { }
  ngOnInit(): void {
      this.getExtraData()
  }

  async getExtraData() {
    const params = {
      type: 'extra_clients'
    }
    let response: any = (await this.partnersPublicService.getPublicPartners(params));
    this.partners = response.data; 
  }

}
