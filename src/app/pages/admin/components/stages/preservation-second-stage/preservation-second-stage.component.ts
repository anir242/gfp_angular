import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-preservation-second-stage',
  templateUrl: './preservation-second-stage.component.html',
  styleUrls: ['./preservation-second-stage.component.scss']
})
export class PreservationSecondStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
