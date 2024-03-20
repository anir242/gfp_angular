import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-widget-tooltip',
  templateUrl: './widget-tooltip.component.html',
  styleUrls: ['./widget-tooltip.component.scss']
})
export class WidgetTooltipComponent extends BaseComponent implements OnInit {

  tooltipVisible: boolean = false;
  maxWidth: number;
  @Input() icon: string = 'assets/images/icons/tooltip.svg';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.onResize();
  }

  toggleTooltip(): void {
    this.tooltipVisible = !this.tooltipVisible;
  }

  onResize() {
    this.maxWidth = document.getElementById('co2-breakdown-id').clientWidth;
  }

}
