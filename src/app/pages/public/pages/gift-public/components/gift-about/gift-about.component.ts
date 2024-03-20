import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-gift-about',
  templateUrl: './gift-about.component.html',
  styleUrls: ['./gift-about.component.scss']
})
export class GiftAboutComponent extends BaseComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get name(): UntypedFormControl {
    return this.form.get('name') as UntypedFormControl;
  }

  get surname(): UntypedFormControl {
    return this.form.get('surname')  as UntypedFormControl;
  }
}
