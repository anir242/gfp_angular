import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-reforestation-third-stage',
  templateUrl: './reforestation-third-stage.component.html',
  styleUrls: ['./reforestation-third-stage.component.scss']
})
export class ReforestationThirdStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
