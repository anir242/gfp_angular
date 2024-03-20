import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() title: string;
  @Input() description?: string;
  @Input() url?: string;
  @Input() buttonText?: string;
  @Output() buttonAction = new EventEmitter<void>();
  @Input() bgColor: string;
  @Input() hiddenButton = false;
  @Input() type?: 'light'|'dark'|'accent';

  constructor() { }

  ngOnInit(): void {
  }

}
