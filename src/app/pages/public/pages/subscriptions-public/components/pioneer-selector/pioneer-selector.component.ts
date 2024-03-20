import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pioneer-selector',
  templateUrl: './pioneer-selector.component.html',
  styleUrls: ['./pioneer-selector.component.scss']
})
export class PioneerSelectorComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() imageSrc: string;
  @Input() value: string;
  @Input() pioneerSelected: string;
  @Input() pioneerModel: string;
  @Output() click: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
