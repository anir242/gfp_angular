import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-icon-text',
  templateUrl: './card-icon-text.component.html',
  styleUrls: ['./card-icon-text.component.scss']
})
export class CardIconTextComponent implements OnInit {
  @Input() type: 'green';
  @Input() title;
  @Input() description;
  @Input() url;
  constructor() { }

  ngOnInit(): void {
  }

}
