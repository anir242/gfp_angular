import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-reforestation-first-stage',
  templateUrl: './reforestation-first-stage.component.html',
  styleUrls: ['./reforestation-first-stage.component.scss']
})
export class ReforestationFirstStageComponent extends StagesComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {
  }
}
