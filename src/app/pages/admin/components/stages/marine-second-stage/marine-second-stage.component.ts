import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-marine-second-stage',
  templateUrl: './marine-second-stage.component.html',
  styleUrls: ['./marine-second-stage.component.scss']
})
export class MarineSecondStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
