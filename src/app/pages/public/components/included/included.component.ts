import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-included',
  templateUrl: './included.component.html',
  styleUrls: ['./included.component.scss']
})
export class IncludedComponent implements OnInit {
  @Input() text: string;
  constructor() { }

  ngOnInit(): void {
  }

}
