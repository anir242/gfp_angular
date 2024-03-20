import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-billing-address-summary',
  templateUrl: './billing-address-summary.component.html',
  styleUrls: ['./billing-address-summary.component.scss']
})
export class BillingAddressSummaryComponent extends BaseComponent implements OnInit {
  items: any;
  @Input() country: string;
  @Input() sdi: string;
  @Input() city: string;
  @Input() street: string;
  @Input() zip: string;
  @Input() showSdi: boolean;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.items = [
      {title: this.translate.instant('singleDonations.country'), value: this.country},
      {title: this.translate.instant('singleDonations.sdi'), value: this.sdi, show: this.showSdi},
      {title: this.translate.instant('singleDonations.city'), value: this.city},
      {title: this.translate.instant('singleDonations.street'), value: this.street},
      {title: this.translate.instant('singleDonations.zip'), value: this.zip},
    ];
  }

}
