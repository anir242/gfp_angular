import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { SinglePaymentPacksInterface } from "../../../../../_models/api/public/single-payment-packs-interface";
import {BaseComponent} from '../../../../_base/base/base.component';

@Component({
  selector: 'app-header-stages',
  templateUrl: './header-stages.component.html',
  styleUrls: ['./header-stages.component.scss']
})
export class HeaderStagesComponent extends BaseComponent implements OnInit {
  
  constructor() {
    super();
  }

  @Input() progress = 0;
  @Input() stageNumber = 0;
  @Input() type: string;
  @Input() description: string;
  @Input() slug: string;
  @Input() singlePaymentPacksInterface: SinglePaymentPacksInterface;

  ngOnInit(): void {
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }
}
