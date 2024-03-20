import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-card-icon-small',
  templateUrl: './card-icon-small.component.html',
  styleUrls: ['./card-icon-small.component.scss']
})
export class CardIconSmallComponent implements OnInit {
  @Input() url: string;
  @Input() title: string;
  @Input() description: string;
  @Input() containerClass: string;
  @Output() readItem = new EventEmitter<string>();
  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  readMore = true;
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.showReadMore();
  }
  readMoreAction(): void{
    this.readMore = !this.readMore;
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
}
