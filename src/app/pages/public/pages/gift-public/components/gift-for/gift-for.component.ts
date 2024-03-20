import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-for',
  templateUrl: './gift-for.component.html',
  styleUrls: ['./gift-for.component.scss']
})
export class GiftForComponent extends BaseComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get name(): UntypedFormControl {
    return this.form.get('name')  as UntypedFormControl;
  }

}
