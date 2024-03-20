import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-single-donation-summary',
  templateUrl: './single-donation-summary.component.html',
  styleUrls: ['./single-donation-summary.component.scss']
})
export class SingleDonationSummaryComponent implements OnInit {
  @Input() price: any;
  @Input() acres: any;
  @Input() tons: any;
  @Input() unit: any;

  constructor() { }

  ngOnInit(): void {
  }

}
