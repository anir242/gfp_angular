import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {SingleFaqInterface} from '../../../../_models/api/public/faq/single-faq-interface';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {FaqService} from '../../../../_services/public/faq.service';
import {Response} from '../../../../_models/api/response';

@Component({
  selector: 'app-main-faq',
  templateUrl: './main-faq.component.html',
  styleUrls: ['./main-faq.component.scss']
})
export class MainFaqComponent extends BaseComponent implements OnInit {
  mockFaq = {
    url: 'https://green-future-project.s3.eu-central-1.amazonaws.com/mockFaq_b00696e6-61fc-419d-b58f-492aaf0a40c5',
    title: this.translate.instant('faq.mockTitle'),
    content: this.translate.instant('faq.mockDescription'),
  };
  singleFaqInterface: SingleFaqInterface[];
  routingTypes = RoutingTypes;

  constructor(
    private faqService: FaqService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMainFaq().then();

  }
  getMainFaq = async () => {
    try {
      const params: any = {
        priority: true,
      };
      const response: Response<SingleFaqInterface[]> = await this.faqService.getMainFaq(params);
      if (response?.success) {
        this.singleFaqInterface = response.data;      
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
