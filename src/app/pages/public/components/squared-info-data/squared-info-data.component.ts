import {Component, Input, OnInit} from '@angular/core';
import {hexToCSSFilter} from '../../../../_models/components/hexToCSSFilter';

@Component({
  selector: 'app-squared-info-data',
  templateUrl: './squared-info-data.component.html',
  styleUrls: ['./squared-info-data.component.scss']
})
export class SquaredInfoDataComponent implements OnInit {
  @Input() squaredPosition: 'left'|'center' = 'center';
  @Input() data: string;
  @Input() description: string;
  @Input() color: string;
  filteredColor: string;

  constructor() { }

  ngOnInit(): void {
    this.filteredColor = hexToCSSFilter(this.color).filter.replace(';', '');

  }

}
