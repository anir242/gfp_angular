import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-type',
  templateUrl: './subscription-type.component.html',
  styleUrls: ['./subscription-type.component.scss']
})
export class SubscriptionTypeComponent implements OnInit {
  @Input() subscriptionType;
  @Input() image;
  constructor() { }

  ngOnInit(): void {
  }

}
