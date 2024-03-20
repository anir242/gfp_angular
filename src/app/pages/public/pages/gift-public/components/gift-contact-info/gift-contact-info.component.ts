import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-contact-info',
  templateUrl: './gift-contact-info.component.html',
  styleUrls: ['./gift-contact-info.component.scss']
})
export class GiftContactInfoComponent extends BaseComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get phone(): UntypedFormControl {
    return this.form.get('phone')  as UntypedFormControl;
  }
  get confirmEmail(): UntypedFormControl {
    return this.form.get('cEmail') as UntypedFormControl;
  }

}
