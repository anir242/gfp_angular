import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-about-title-public',
  templateUrl: './about-title-public.component.html',
  styleUrls: ['./about-title-public.component.scss']
})
export class AboutTitlePublicComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Input() buttonText: string;
  @Input() linkText?: string;
  @Input() linkUrl?: string;
  @Input() name?: string;
  @Input() arrow?: string;
  @Output() button = new EventEmitter<void>();

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
