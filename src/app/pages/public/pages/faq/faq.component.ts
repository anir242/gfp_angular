import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {environment} from '../../../../../environments/environment';
import {Response} from '../../../../_models/api/response';
import {ProjectGalleryInterface} from '../../../../_models/api/projects/project-gallery-interface';
import {FaqService} from '../../../../_services/public/faq.service';
import {FaqInterface} from '../../../../_models/api/public/faq/faq-interface';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends BaseComponent implements OnInit {
  // urlFaq = 'https://green-future-project.s3.eu-central-1.amazonaws.com/faqBg_50e221ba-99d8-483e-92ff-0c3f47426885';
  showJoin = environment.showJoinTeam;
  faqInterface: FaqInterface[];
  defaultInput = '';
  searchInput = new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
  mockFaq = {
    url: 'https://green-future-project.s3.eu-central-1.amazonaws.com/mockFaq_b00696e6-61fc-419d-b58f-492aaf0a40c5', // TODO: HERE CHANGE PIE CHART IMAGE
    title: this.translate.instant('faq.mockTitle'),
    content: this.translate.instant('faq.mockDescription'),
  };
  faqData = []
  constructor(
    private faqService: FaqService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getFaqSection().then();
  }

  getFaqSection = async () => {
    try {
      const response: Response<FaqInterface[]> = await this.faqService.getFaqSections();
      if (response?.success) {
        this.faqData = [...response.data]
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  setLang(): void {
    if (localStorage.getItem('lang') == 'it') {
      this.faqData?.forEach((section) => {
        section.title = section.title_it;
        section.faqs?.forEach((faq) => {
          faq.title = faq.title_it;
          faq.content = faq.content_it;
        });
      });
    }
  }
}
