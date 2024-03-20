import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-details-supporting',
  templateUrl: './subscription-details-supporting.component.html',
  styleUrls: ['./subscription-details-supporting.component.scss']
})
export class SubscriptionDetailsSupportingComponent implements OnInit {
  @Input() text: string;
  @Input() iconName: string;
  @Input() value: number;
  constructor() { }

  ngOnInit(): void {
  }

}
