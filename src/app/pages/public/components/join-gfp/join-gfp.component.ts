import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {resolveSrv} from 'dns';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-join-gfp',
  templateUrl: './join-gfp.component.html',
  styleUrls: ['./join-gfp.component.scss']
})
export class JoinGfpComponent extends BaseComponent implements OnInit {
  subscriptionData = new UntypedFormGroup({
    aboutYou: new UntypedFormGroup({
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      message: new UntypedFormControl('', [Validators.required]),
    }),
  });
  @Input() title: string;
  @Input() description: string;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  get aboutYou(): UntypedFormGroup {
    return this.subscriptionData.get('aboutYou') as UntypedFormGroup;
  }
}
