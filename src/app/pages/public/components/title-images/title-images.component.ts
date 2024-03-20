import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-title-images',
  templateUrl: './title-images.component.html',
  styleUrls: ['./title-images.component.scss']
})
export class TitleImagesComponent implements OnInit {
  @Input() images: any;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
