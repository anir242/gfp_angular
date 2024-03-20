import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-share-buttons-dialog',
  templateUrl: './share-buttons-dialog.component.html',
  styleUrls: ['./share-buttons-dialog.component.scss']
})
export class ShareButtonsDialogComponent implements OnInit {

  url: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.url = this.data.url;
  }

}
