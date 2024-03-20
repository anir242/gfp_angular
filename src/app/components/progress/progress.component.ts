import {Component, Input, OnInit} from '@angular/core';
import {ProgressTypes} from '../../_models/components/progress-types';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input() type?: string = typeof ProgressTypes;
  @Input() items?: any;
  @Input() circleColor?: string;
  @Input() svgColor?: string;
  @Input() numberColor?: string;
  @Input() title?: string;
  @Input() numberFont?: string;
  @Input() titleFont?: string;
  @Input() descriptionFont?: string;
  @Input() forGift: boolean = false;
  progressTypes = ProgressTypes;
  constructor() {
  }
  ngOnInit(): void {
  }
  setColor = () => {
    return {
      'background-color': this.circleColor,
    };
  }
  setSvgColor = () => {
    return {
      stroke: this.svgColor
    };
  }
}
