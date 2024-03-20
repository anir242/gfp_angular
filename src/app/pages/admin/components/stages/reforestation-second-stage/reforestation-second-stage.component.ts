import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-reforestation-second-stage',
  templateUrl: './reforestation-second-stage.component.html',
  styleUrls: ['./reforestation-second-stage.component.scss']
})
export class ReforestationSecondStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
