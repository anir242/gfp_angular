import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chip-label',
  templateUrl: './chip-label.component.html',
  styleUrls: ['./chip-label.component.scss']
})
export class ChipLabelComponent implements OnInit {
  @Input() text: string;
  @Input() color: string;

  constructor() { }

  ngOnInit(): void {
  }

  setBg(color: string): any {
    return {
      'background-color': color,
    };
  }
}
