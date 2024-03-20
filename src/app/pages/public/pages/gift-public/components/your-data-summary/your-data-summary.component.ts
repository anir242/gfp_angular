import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-your-data-summary',
  templateUrl: './your-data-summary.component.html',
  styleUrls: ['./your-data-summary.component.scss']
})
export class YourDataSummaryComponent implements OnInit {
  @Input() name: string;
  @Input() surname: string;
  @Input() email: string;
  @Input() phone: any;

  constructor() { }

  ngOnInit(): void {
  }

}
