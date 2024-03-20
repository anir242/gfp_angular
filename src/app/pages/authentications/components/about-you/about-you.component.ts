import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.scss']
})
export class AboutYouComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  get firstName(): any {
    return this.form?.get('firstName');
  }

  get lastName(): any {
    return this.form?.get('lastName');
  }
}
