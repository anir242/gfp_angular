import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-mat-input',
  templateUrl: './mat-input.component.html',
  styleUrls: ['./mat-input.component.scss']
})
export class MatInputComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() autocomplete?: string;
  @Input() labelError?: string;
  @Input() labelPatternError?: string;
  @Input() labelMinError?: string;
  @Input() labelMaxError?: string;
  @Input() labelMismatchError?: string;
  @Input() required = false;
  @Input() type = 'text';
  @Input() textAreaHeight?: string;
  @Input() textAreaLength?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
  @Input() appearance?: string = 'outline';
  @Input() min?: number;
  @Input() max?: number;
  @Input() placeholder?: string;
  @Input() hint?: string;
  constructor() {
  }

  ngOnInit(): void {}

}
