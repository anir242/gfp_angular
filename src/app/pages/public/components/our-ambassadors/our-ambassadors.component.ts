import {Component, Input, OnInit} from '@angular/core';
import {TeamInterface} from '../../../../_models/api/public/team-interface';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-our-ambassadors',
  templateUrl: './our-ambassadors.component.html',
  styleUrls: ['./our-ambassadors.component.scss']
})
export class OurAmbassadorsComponent implements OnInit {
  @Input() ambassadors: TeamInterface[];
  @Input() business: boolean;
  maxWidth = '(max-width: 268px)';
  minWidth = '(min-width: 267px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  arrows: boolean;
  isMobile: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;

  constructor( private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.cardMeasures();
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 991px)');
    this.isMediumScreen = this.breakpointObserver.isMatched('(max-width: 1199px)');
  }

  private cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.cardWidth = 260;
        this.carouselHeight = 300;
        if (this.ambassadors?.length > 3) {
          this.arrows = true;
        } else {
          this.arrows = false;
        }
      } else {
        this.cardWidth = 240;
        this.carouselHeight = 250;
        this.arrows = false;
      }
    });
  }

}
