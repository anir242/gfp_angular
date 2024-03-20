import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-support-value',
  templateUrl: './support-value.component.html',
  styleUrls: ['./support-value.component.scss']
})
export class SupportValueComponent implements OnInit {
  @Input() number: string;
  @Input() description: string;

  constructor() { }
  ngOnInit(): void {
  }

}
