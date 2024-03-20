import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-data',
  templateUrl: './login-data.component.html',
  styleUrls: ['./login-data.component.scss'],
})
export class LoginDataComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  hidePassword = true;

  constructor() {}

  ngOnInit(): void {}
  get email(): any {
    return this.form.get('email');
  }

  get password(): any {
    return this.form.get('password');
  }
}
