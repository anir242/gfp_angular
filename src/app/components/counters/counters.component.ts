import { P } from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() title: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  remove() {
    let value = 0;
    if (this.control) {
      value = this.control.value;
    }
    if (value > 0) {
      this.control?.patchValue(value - 1);
    }
  }

  add() {
    let value = 0;
    if (this.control) {
      value = this.control.value;
    }
    this.control?.patchValue(value + 1);

  }
}
