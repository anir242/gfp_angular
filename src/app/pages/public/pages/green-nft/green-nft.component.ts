import { Component, OnInit } from '@angular/core';
import { CalendlyPopupComponent } from 'src/app/pages/public/components/calendly-popup/calendly-popup.component';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-green-nft',
  templateUrl: './green-nft.component.html',
  styleUrls: ['./green-nft.component.scss']
})
export class GreenNftComponent extends BaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  popupCalendly(): void {
    const dialog = this.dialog.open(CalendlyPopupComponent, { panelClass: 'noPadding' });
  }

  viewProduct() {
    this.track('view_item', [this.asProduct(
      'green-nft-plugin', 'Green NFT Plugin', 'EUR', 0, 1, 'plugin', 
      'plugin', 'blockchain', 'plugins', 'Plugins'
    )]);
  }

  scrollToSection(): void {
    let el = document.getElementById('contact-form');
    el.scrollIntoView();
  }
}
