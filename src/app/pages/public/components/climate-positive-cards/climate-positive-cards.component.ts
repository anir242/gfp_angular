import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-climate-positive-cards',
  templateUrl: './climate-positive-cards.component.html',
  styleUrls: ['./climate-positive-cards.component.scss']
})
export class ClimatePositiveCardsComponent extends BaseComponent implements OnInit {
  @Input() mainheading: string;
  @Input() description: string;
  @Input() valuePerMonth: string;
  @Input() treesValue: string;
  @Input() forestProtected: string;
  @Input() energyProduced: string;
  @Input() co2offset: string;
  @Input() imgURL: string;
  @Input() statsIconURL: string;
  @Input() supported: any;
  @Input() co2Values: any[];

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
