import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-banner-dialog',
  templateUrl: './banner-dialog.component.html',
  styleUrls: ['./banner-dialog.component.scss']
})
export class BannerDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

}
