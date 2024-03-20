import {Component, Inject, OnInit} from '@angular/core';
import {translate} from '@angular/localize/tools';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-gift-pick-info',
  templateUrl: './gift-pick-info.component.html',
  styleUrls: ['./gift-pick-info.component.scss']
})
export class GiftPickInfoComponent extends BaseComponent implements OnInit {
  items = [this.translate.instant('gift.dashboard'),
          this.translate.instant('gift.recipient'),
          this.translate.instant('gift.activation')];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
