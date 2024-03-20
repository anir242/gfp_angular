import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-marine-first-stage',
  templateUrl: './marine-first-stage.component.html',
  styleUrls: ['./marine-first-stage.component.scss']
})
export class MarineFirstStageComponent extends StagesComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
