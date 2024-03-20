import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '../../../../_models/api/response';
import { NewsletterService } from '../../../../_services/public/newsletter.service';
import { BaseComponent } from '../../../_base/base/base.component';

@Component({
  selector: 'app-calendly-popup',
  templateUrl: './calendly-popup.component.html',
  styleUrls: ['./calendly-popup.component.scss'],
})
export class CalendlyPopupComponent extends BaseComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { buttonUrl: string; type: string }
  ) {
    super();
  }
  ngOnInit(): void {}

  lodgeBookDemoEvent(): void {
    if (this.data.type === 'demo') {
      this.identify('Book_demo_popup', 'Hubspot');
    } else if (this.data.type === 'checkout') {
      this.identify('Book_demo_checkout', 'Hubspot');
    }
  }
}
