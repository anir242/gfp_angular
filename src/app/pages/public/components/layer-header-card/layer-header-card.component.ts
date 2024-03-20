import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-layer-header-card',
  templateUrl: './layer-header-card.component.html',
  styleUrls: ['./layer-header-card.component.scss']
})
export class LayerHeaderCardComponent extends BaseComponent implements OnInit {
  @Input() headingText: string;
  @Input() bodyText: string;
  @Input() value: string;
  @Input() leftContentImgURL: string;
  @Input() rightContentImgURL: string;
  @Input() leftBodyText: string;
  @Input() rightBodyText: string;
  @Input() leftHeadingText?: string;
  @Input() rightHeadingText?: string;

  isMediumScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    super()
  }

  ngOnInit(): void {
    this.isMediumScreen = this.breakpointObserver.isMatched('(max-width: 1199px)');
  }

}
