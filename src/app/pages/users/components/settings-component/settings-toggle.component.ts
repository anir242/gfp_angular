import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-component',
  templateUrl: './settings-toggle.component.html',
  styleUrls: ['./settings-toggle.component.scss']
})
export class SettingsToggleComponent implements OnInit {
  @Input() name;
  @Input() description;
  constructor() { }

  ngOnInit(): void {
  }

}
