import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-arrow-scroll',
  templateUrl: './arrow-scroll.component.html',
  styleUrls: ['./arrow-scroll.component.scss']
})
export class ArrowScrollComponent extends BaseComponent implements OnInit {
  @Input() id: string;
  @Input() business: boolean;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
