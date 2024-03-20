import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-about-solution',
  templateUrl: './about-solution.component.html',
  styleUrls: ['./about-solution.component.scss']
})
export class AboutSolutionComponent extends BaseComponent implements OnInit {
  @Input() bgColor: string;
  @Input() description: string;
  @Input() items;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  setColor = () => {
   return {
      'background-color': this.bgColor,
    };
  }
}
