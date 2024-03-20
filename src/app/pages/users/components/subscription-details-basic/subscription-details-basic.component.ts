import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-details-basic',
  templateUrl: './subscription-details-basic.component.html',
  styleUrls: ['./subscription-details-basic.component.scss']
})
export class SubscriptionDetailsBasicComponent implements OnInit {
  @Input() firstText: string;
  @Input() secondText: string;
  @Input() displayEdit = false;
  constructor() {
  }
  ngOnInit(): void {

  }

}
