import {Component, Input, OnInit} from '@angular/core';
import {SingleFaqInterface} from '../../../../_models/api/public/faq/single-faq-interface';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss']
})
export class FaqItemComponent extends BaseComponent implements OnInit {
  @Input() faqs: SingleFaqInterface[];
  @Input() theme: 'light'|'';
  @Input() mockFaq: any;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
