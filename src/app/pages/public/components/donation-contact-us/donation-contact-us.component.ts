import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-donation-contact-us',
  templateUrl: './donation-contact-us.component.html',
  styleUrls: ['./donation-contact-us.component.scss']
})
export class DonationContactUsComponent extends BaseComponent implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit(): void {
  }

}
