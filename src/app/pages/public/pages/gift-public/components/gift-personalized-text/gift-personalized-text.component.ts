import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-gift-personalized-text',
  templateUrl: './gift-personalized-text.component.html',
  styleUrls: ['./gift-personalized-text.component.scss']
})
export class GiftPersonalizedTextComponent extends BaseComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  selection = true;
  addMessage = true;
  constructor() {
    super();
  }

  ngOnInit(): void {

  }
  get choose(): UntypedFormControl {
    return this.form?.get('choose')  as UntypedFormControl;
  }
  get message(): UntypedFormControl {
    return this.form?.get('message') as UntypedFormControl;
  }

  setControl(): void{
    if (this.addMessage) {
      this.message.enable();
    } else {
      this.message.disable();
    }
  }
}
