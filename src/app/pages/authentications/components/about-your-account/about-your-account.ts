import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-your-account',
  templateUrl: './about-your-account.component.html',
  styleUrls: ['./about-your-account.component.scss']
})
export class AboutYourAccountComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() appearance?: string = 'fill';
  @Input() passwordHint?: string;

  constructor() { }

  ngOnInit(): void {
  }

  get email(): UntypedFormControl {
    return this.form.get('email') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.form.get('password')  as UntypedFormControl;
  }

  get cPassword(): UntypedFormControl {
    return this.form.get('cPassword') as UntypedFormControl;
  }
}
