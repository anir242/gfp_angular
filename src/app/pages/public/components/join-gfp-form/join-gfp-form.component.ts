import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-join-gfp-form',
  templateUrl: './join-gfp-form.component.html',
  styleUrls: ['./join-gfp-form.component.scss']
})
export class JoinGfpFormComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
  }
  get firstName(): any {
    return this.form?.get('firstName');
  }

  get lastName(): any {
    return this.form?.get('lastName');
  }

  get email(): any {
    return this.form?.get('email');
  }

  get message(): any {
    return this.form?.get('message');
  }
}
