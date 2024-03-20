import {Component, EventEmitter, Input, OnInit, Output, HostListener} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {Response} from '../../../../../../_models/api/response';
import {ImagesInterface} from '../../../../../../_models/api/images-interface';
import {UntypedFormControl} from '@angular/forms';
import {ImagesService} from '../../../../../../_services/images.service';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';

@Component({
  selector: 'app-gift-summary',
  templateUrl: './gift-summary.component.html',
  styleUrls: ['./gift-summary.component.scss']
})
export class GiftSummaryComponent extends BaseComponent implements OnInit {
  @Input() url: string;
  @Input() imageTypes: string;
  @Input() imageFormControl: UntypedFormControl;
  @Input() title: number;
  @Input() subtitle: string;
  @Input() subtotal: number;
  @Input() disabledButton = true;
  @Input() giftA: string;
  @Output() addToCart = new EventEmitter<boolean>();
  isSticky: boolean = false;

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    let content = document.getElementById('giftDetails');
    this.isSticky = window.pageYOffset >= 1050;
  }

  async goToCheckOut(): Promise<void> {
    this.addToCart.emit();
    await this.router.navigate([RoutingTypes.CHECK_OUT]);
  }
}
