import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tick-and-text',
  templateUrl: './tick-and-text.component.html',
  styleUrls: ['./tick-and-text.component.scss']
})
export class TickAndTextComponent implements OnInit {
  @Input() text;
  constructor() { }

  ngOnInit(): void {
  }

}
