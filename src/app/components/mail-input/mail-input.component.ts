import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
  selector: 'app-mail-input',
  templateUrl: './mail-input.component.html',
  styleUrls: ['./mail-input.component.scss']
})
export class MailInputComponent implements OnInit {
  @Input() buttonText: string;
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() autocomplete?: string;
  @Input() labelError?: string;
  @Input() fill = false;
  @Input() theme?: 'dark';
  @Input() labelPatternError?: string;
  @Input() labelMismatchError?: string;
  @Input() required = false;
  @Input() position: 'start'|'center' = 'start';
  @Output() buttonClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
