import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { pipe, take } from 'rxjs';
import { ReviewInterface, ReviewService } from 'src/app/_services/public/local/review.service';
import { PartnersPublicService } from 'src/app/pages/public/pages/partners-public/partners-public.service';

@Component({
  selector: 'app-review-public',
  templateUrl: './review-public.component.html',
  styleUrls: ['./review-public.component.scss']
})
export class ReviewPublicComponent implements OnInit {

  maxWidth = '(max-width: 268px)';
  minWidth = '(min-width: 267px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  arrows: boolean;
  reviews: ReviewInterface[];
  partners:any;
  @Input() business: boolean;
  // data;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private reviewService: ReviewService,
    private partnersPublicService: PartnersPublicService
  ) { }

  ngOnInit(): void {
    this.getPressData();
    this.cardMeasures();
  }

  async getPressData() {
    const params = {
      type: ['extra_press','main_press']
    }
    let response: any = (await this.partnersPublicService.getPublicPartners(params));
    this.partners = response.data.filter((partner:any)=>partner.type == 'extra_press');
    this.reviews = response.data.filter((partner:any)=>partner.type == 'main_press');
  }


  // private getData(): void {
  //   this.reviewService.getReviews().then((res: any) => {this.data = res.data; this.setLang()});
  //   this.reviewService.getReviews()
  //     .pipe(take(1))
  //     .subscribe(
  //       res => {
  //         this.reviews = res;
  //       }
  //     )
  // }

  // setLang(): void {
    // const selectedLang = localStorage.getItem('lang');
    // if (selectedLang == 'it') {
      // this.data?.forEach((item) => {
        // item.description = item.description_it;
      // });
    // }
  // }

  private cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.cardWidth = 260;
        this.carouselHeight = 300;
        if (this.reviews?.length > 3) {
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
