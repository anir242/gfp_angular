import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-about-problem',
  templateUrl: './about-problem.component.html',
  styleUrls: ['./about-problem.component.scss']
})
export class AboutProblemComponent extends BaseComponent implements OnInit {
  @Input() description: string;
  @Input() url: string;
  x = window.matchMedia('(max-width: 767px)');
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  setBackground(img: string): any {
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50% 50%'
    };
  }

  setBg(): any {
    let styles;
    if (this.x.matches) {
    } else {
      styles = {
        'background-repeat': 'no-repeat',
        'background-position': 'right',
        'background-size': '50% auto',
        'background-image': 'url(' + this.url + ')',
/*
        'background-image': `linear-gradient(90deg, url(${this.url}) 50%, ${'white'} 50%)`
*/
      };
    }
    return styles;
  }

}
