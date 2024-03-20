import {Component, Input, OnInit} from '@angular/core';
import { SinglePaymentPacksInterface } from '../../../../../_models/api/public/single-payment-packs-interface';
import {BaseComponent} from '../../../../_base/base/base.component';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent extends BaseComponent implements OnInit {
  imgName: string;
  @Input() slug: string;
  @Input() type: string;
  @Input() bgColor: string;
  @Input() pack: SinglePaymentPacksInterface
  constructor() {
    super();
  }

  ngOnInit(): void {
     this.imgName = 'inactiveStage.png';
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

}
