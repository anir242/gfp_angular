import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-unsure',
  templateUrl: './unsure.component.html',
  styleUrls: ['./unsure.component.scss']
})
export class UnsureComponent extends BaseComponent implements OnInit {
  @Input() items;
  @Input() title;
  @Input() subtitle;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
