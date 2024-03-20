import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {ProgressTypes} from '../../../../_models/components/progress-types';

@Component({
  selector: 'app-progress-scroller',
  templateUrl: './progress-scroller.component.html',
  styleUrls: ['./progress-scroller.component.scss']
})
export class ProgressScrollerComponent extends BaseComponent implements OnInit {
  @Input() progressType: ProgressTypes;
  @Input() items: any;
  @Input() title: string;
  @Input() buttonText: string;
  @Input() buttonDisabled: boolean;
  @Input() buttonAction: () => void;
  @Input() itemTheme: 'light'|'dark';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
