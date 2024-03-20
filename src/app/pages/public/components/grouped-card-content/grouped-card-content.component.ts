import { Component, OnInit, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-grouped-card-content',
  templateUrl: './grouped-card-content.component.html',
  styleUrls: ['./grouped-card-content.component.scss']
})
export class GroupedCardContentComponent extends BaseComponent implements OnInit {
  @Input() headerText: string;
  @Input() bodyText: string;
  @Input() imgUrl: string;
  @Input() customContentStyle: object;
  @Input() imgStyle: object;

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
