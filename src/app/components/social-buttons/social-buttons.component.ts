import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../pages/_base/base/base.component';

@Component({
  selector: 'app-social-buttons',
  templateUrl: './social-buttons.component.html',
  styleUrls: ['./social-buttons.component.scss']
})
export class SocialButtonsComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
