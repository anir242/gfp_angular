import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent extends BaseComponent implements OnInit {
  whatWeDo = 'https://green-future-project.s3.eu-central-1.amazonaws.com/about_whatWeDo_bg_8fd5105d-0471-447a-8a91-ca6a0f2776e3';
  urlSubscribe = 'https://green-future-project.s3.eu-central-1.amazonaws.com/woocommerce_db8865c4-886c-4790-a137-ca16b8c9185e';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
