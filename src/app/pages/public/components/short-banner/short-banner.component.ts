import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { StorageName } from 'src/app/_models/components/storage-name';

@Component({
  selector: 'app-short-banner',
  templateUrl: './short-banner.component.html',
  styleUrls: ['./short-banner.component.scss']
})
export class ShortBannerComponent extends BaseComponent implements OnInit {
  @Input() product: string;
  @Input() background: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() buttonText: string;
  @Input() showButton: boolean = false;
  @Input() url: string;
  @Output() button = new EventEmitter<void>();
  @Input() btnStyle: object;
  isSmallScreen: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    super()
  }

  ngOnInit(): void {
    this.isSmallScreen= this.breakpointObserver.isMatched('(max-width:991px)');
    switch (this.product) {

    }
  }

  proceed(): void {
    localStorage.removeItem(StorageName.businessEmployees);
    localStorage.removeItem(StorageName.businessPioneer);
    this.button.emit();
    this.router.navigate([this.url]);
  }

}
