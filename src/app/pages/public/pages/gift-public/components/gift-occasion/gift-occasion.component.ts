import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
@Component({
  selector: 'app-gift-occasion',
  templateUrl: './gift-occasion.component.html',
  styleUrls: ['./gift-occasion.component.scss'],
})
export class GiftOccasionComponent extends BaseComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() options: string[];
  minDate = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2));

  constructor(
    private dateAdapter: DateAdapter<Date>
  ) {
    super();
    this.dateAdapter.setLocale(this.translate.getBrowserCultureLang());
  }

  ngOnInit(): void {
  }

  get occasion(): UntypedFormControl {
    return this.form.get('occasion') as UntypedFormControl;
  }

  get deliveryDate(): UntypedFormControl {
    return this.form.get('deliveryDate')  as UntypedFormControl;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  }
}
