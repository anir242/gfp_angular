import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Response} from '../../../../_models/api/response';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Input() type: 'small'|'large';
  @Input() slug: string;

  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  arrows: boolean;
  pressItems: any[];

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    super();
  }

  ngOnInit(): void {
    this.pressItems = [
      {
        name: 'TedX',
        url: 'https://www.youtube.com/watch?v=wYtwcfDT5W8',
        image: '/assets/images/press/tedx.png'
      },
      {
        name: 'Vanity Fair',
        url: 'https://www.vanityfair.it/news/approfondimenti/2021/04/06/vanity-fair-green-from-challenge-to-change-sostenibilita',
        image: '/assets/images/press/vanity-fair.png'
      },
      {
        name: 'Tg2',
        url: 'https://www.youtube.com/watch?v=ZYSjLMAFUUs',
        image: '/assets/images/press/tg2.png'
      },
      {
        name: 'Startup Italia',
        url: 'https://startupitalia.eu/79699-20220321-la-startup-e-gap-piantera-mangrovie-e-proteggera-la-foresta-tropicale-a-ogni-ricarica',
        image: '/assets/images/press/startup-italia.png'
      },
    ];
    this.cardMeasures();
  }

  cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      this.cardWidth = 192;
      this.carouselHeight = 200;
      //this.arrows = result.breakpoints[this.minWidth];
      this.arrows = false;
    });
  }
}
