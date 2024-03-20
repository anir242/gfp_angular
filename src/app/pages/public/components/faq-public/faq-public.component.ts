import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { SingleFaqInterface } from 'src/app/_models/api/public/faq/single-faq-interface';
import { FaqService } from 'src/app/_services/public/faq.service';
import { Response } from '../../../../_models/api/response';

@Component({
  selector: 'app-faq-public',
  templateUrl: './faq-public.component.html',
  styleUrls: ['./faq-public.component.scss']
})
export class FaqPublicComponent extends BaseComponent implements OnInit {

  data: SingleFaqInterface[];
  contentData: [];
  selectedItem: any;
  selectedIndex: number = 0;
  @Input() showHeader: boolean;
  @Input() newFaqData: [];
  @Input() queryTitle: string

  constructor(
    private faqService: FaqService
  ) {
    super();
   }

  ngOnInit(): void {
    if(this.showHeader){
      this.getMainFaq().then();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.newFaqData){
      if((changes.newFaqData?.previousValue) !== (changes.newFaqData?.currentValue)){
        this.data = changes.newFaqData.currentValue
        this.contentData = changes.newFaqData?.currentValue[this.selectedIndex]?.faqs
      }
    }
  }

  getMainFaq = async () => {
    try {
      const params: any = {
        title: this.queryTitle,
      };
      const response: Response<SingleFaqInterface[]> = await this.faqService.getFaqSections(params);
      if (response?.success) {
        this.data = response.data[0].faqs;
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  selectedOption = (item, index) => {
    this.selectedIndex = index
    this.contentData = item?.faqs
  }

  setLang(): void {
    if (localStorage.getItem('lang') == 'it') {
      this.data?.forEach((faq) => {
        faq.title = faq.title_it;
        faq.content = faq.content_it;
      });
    }
  }
}
