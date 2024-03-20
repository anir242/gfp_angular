import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})
export class SubscriptionCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() url: string;
  @Input() description: string;
  constructor() { }

  ngOnInit(): void {
  }

}
