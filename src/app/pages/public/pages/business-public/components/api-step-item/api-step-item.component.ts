import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-api-step-item',
  templateUrl: './api-step-item.component.html',
  styleUrls: ['./api-step-item.component.scss']
})
export class ApiStepItemComponent implements OnInit {
  @Input() imgPosition: 'left'|'right' = 'left';
  @Input() url: string;
  @Input() title: string;
  @Input() description: string;
  @Input() showReadMore = false;
  readMore = true;
  mobileDescription: string;
  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    if (this.showReadMore){
      this.screenObserver();
    }
  }
  screenObserver(): void{
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.mobileDescription = this.description;
        this.readMore = true;
      }else{
        this.mobileDescription = this.description.split('\n')[0];
        this.readMore = false;
      }
    });
  }
  readMoreAction(): void{
    this.readMore = !this.readMore;
    if (this.readMore){
      this.mobileDescription = this.description;
    }else{
      this.mobileDescription = this.description.split('\n')[0];
    }

  }
}
