import { Component, OnInit } from '@angular/core';
import { PartnersPublicService } from 'src/app/pages/public/pages/partners-public/partners-public.service';

@Component({
  selector: 'app-partners-public',
  templateUrl: './partners-public.component.html',
  styleUrls: ['./partners-public.component.scss']
})
export class PartnersPublicComponent implements OnInit {

  data;
  partners;
  strategicPartners;
  constructor(
    private partnersPublicService: PartnersPublicService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.partnersPublicService.getPublicPartners().then((res: any) => {this.data = res.data; this.setLang()});
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.data?.forEach((item) => {
        item.description = item.description_it;
      });
    }
    if(this.data){
      this.partners = this.data.filter((partner)=> partner.type == 'partners')
      this.strategicPartners = this.data.filter((partner)=> partner.type == 'strategic')
    }
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }

  OnClick(url: string){
    window.location.href=url;
  }

}
