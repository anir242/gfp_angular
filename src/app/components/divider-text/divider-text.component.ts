import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-divider-text',
  templateUrl: './divider-text.component.html',
  styleUrls: ['./divider-text.component.scss']
})
export class DividerTextComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
