import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-project-about-data',
  templateUrl: './project-about-data.component.html',
  styleUrls: ['./project-about-data.component.scss']
})
export class ProjectAboutDataComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Input() slug: string;
  @Input() data1: string;
  @Input() data2: string;
  @Input() data3: string;
  @Input() description1: string;
  @Input() description2: string;
  @Input() description3: string;
  @Input() bgImage: string;
  @Input() color: string;
  filteredColor: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }


  setBackground(img: string): any {
    return {
      background: `url(${img}) no-repeat`,
      'background-size': 'cover',
      'background-position': '50%',
    };
  }
}
