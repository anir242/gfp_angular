import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-campaign-item',
  templateUrl: './campaign-item.component.html',
  styleUrls: ['./campaign-item.component.scss']
})
export class CampaignItemComponent implements OnInit, AfterViewInit {
  @Input() mainTitle: string;
  @Input() title1: string;
  @Input() title2: string;
  @Input() description1: string;
  @Input() description2: string;
  @Input() url: string;
  @ViewChild('campaignCarousel') carousel: any;
  readMore = true;
  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.showReadMore();
  }


  ngAfterViewInit(): void {
  }
  setBg(url: string): any {
    let styles;
    styles = {
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'background-size': '100%',
      'background-image': 'url(' + url + ')',
    };
    return styles;
  }
  showReadMore(): void{
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.readMore = true;
      }else{
        this.readMore = false;
      }
    });
  }
  readMoreAction(): void{
    this.readMore = !this.readMore;
  }
}
