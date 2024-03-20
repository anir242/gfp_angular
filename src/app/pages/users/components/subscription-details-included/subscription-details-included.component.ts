import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-details-included',
  templateUrl: './subscription-details-included.component.html',
  styleUrls: ['./subscription-details-included.component.scss']
})
export class SubscriptionDetailsIncludedComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
