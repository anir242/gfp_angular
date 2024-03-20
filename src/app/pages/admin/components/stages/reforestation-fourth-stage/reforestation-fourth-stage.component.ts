import {Component, OnInit} from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-reforestation-fourth-stage',
  templateUrl: './reforestation-fourth-stage.component.html',
  styleUrls: ['./reforestation-fourth-stage.component.scss']
})
export class ReforestationFourthStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
