import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  firstStar: string;
  secondStar: string;
  thirdStar: string;
  fourthStar: string;
  fifthStart: string;

  constructor() {
  }
  ngOnInit(): void {
    if (this.rating === 5) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.fullCircle;
      this.fourthStar = this.fullCircle;
      this.fifthStart = this.fullCircle;
    } else if (this.rating === 4.5) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.fullCircle;
      this.fourthStar = this.fullCircle;
      this.fifthStart = this.halfCircle;
    } else if (this.rating === 4) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.fullCircle;
      this.fourthStar = this.fullCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 3.5) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.fullCircle;
      this.fourthStar = this.halfCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 3) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.fullCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 2.5) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.halfCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 2.0) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.fullCircle;
      this.thirdStar = this.emptyCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 1.5) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.halfCircle;
      this.thirdStar = this.emptyCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 1) {
      this.firstStar = this.fullCircle;
      this.secondStar = this.emptyCircle;
      this.thirdStar = this.emptyCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else if (this.rating === 0.5) {
      this.firstStar = this.halfCircle;
      this.secondStar = this.emptyCircle;
      this.thirdStar = this.emptyCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    } else {
      this.firstStar = this.emptyCircle;
      this.secondStar = this.emptyCircle;
      this.thirdStar = this.emptyCircle;
      this.fourthStar = this.emptyCircle;
      this.fifthStart = this.emptyCircle;
    }
  }

  get halfCircle(): string {
    return 'assets/images/svg/ellipse_half.svg';
  }

  get fullCircle(): string {
    return 'assets/images/svg/ellipse.svg';
  }

  get emptyCircle(): string {
    return 'assets/images/svg/ellipse_empty.svg';
  }

}
