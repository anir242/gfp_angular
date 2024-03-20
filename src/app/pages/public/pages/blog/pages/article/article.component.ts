import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends BaseComponent implements OnInit {

  maxWidth = '(max-width: 768px)';
  minWidth = '(min-width: 767px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  cellsToShow: number;
  isLargeScreen: boolean;

  data: any []= [1,2,3,4];  //temp array

  constructor(private breakpointObserver: BreakpointObserver,) {
    super();
  }

  ngOnInit(): void {
    this.cardMeasures();
    this.isLargeScreen = this.breakpointObserver.isMatched('(max-width: 1399px)');
  }

  private cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {

      this.carouselHeight = 465;
      if (result.breakpoints[this.minWidth]) {
        this.cardWidth = 309;
        this.cellsToShow = 0;
      } else {
        this.cardWidth = 268;
        this.cellsToShow = 1;
      }
    });
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }
}
