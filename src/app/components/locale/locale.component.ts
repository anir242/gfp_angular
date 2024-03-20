import {Component, OnInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModalType} from '../../_models/components/modal-types';
import {ModalComponent} from '../modal/modal.component';
import { faClose, faGlobe } from '@fortawesome/pro-regular-svg-icons';


@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent extends ModalComponent implements OnInit {
  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  region: string = !!localStorage.getItem('region') ? localStorage.getItem('region') : 'all';
  selectedCurrency: Currency = !!localStorage.getItem('currency') ? Currency[localStorage.getItem('currency')] : Currency.eur;
  currency: string = !!localStorage.getItem('currency') ? localStorage.getItem('currency') : 'eur';
  Currency = Currency;
  currencies = require('src/assets/json/locale/currencies.json');
  regions = require('src/assets/json/locale/regions.json');
  languages = require('src/assets/json/locale/languages.json');
  updated: boolean = false;
  faClose = faClose;
  faGlobe = faGlobe;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<LocaleComponent>) {
    super(data);
  }

  ngOnInit(): void {
  }

  update() {
    this.updated = true;
  }

  cancel() {
    this.dialogRef.close()
  }

  confirm() {
    // closing itself and sending data to parent component
    this.dialogRef.close({ data: {
      lang: this.lang,
      region: this.region,
      currency: this.currency
    }})
  }
}

enum Currency {
  "($) USD" = 'usd',
  "(€) EUR" = 'eur',
  usd = "($) USD",
  eur = "(€) EUR"
}
