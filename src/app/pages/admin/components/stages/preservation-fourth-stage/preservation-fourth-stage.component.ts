import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-preservation-fourth-stage',
  templateUrl: './preservation-fourth-stage.component.html',
  styleUrls: ['./preservation-fourth-stage.component.scss']
})
export class PreservationFourthStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
