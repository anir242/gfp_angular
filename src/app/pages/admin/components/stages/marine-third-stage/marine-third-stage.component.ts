import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-marine-third-stage',
  templateUrl: './marine-third-stage.component.html',
  styleUrls: ['./marine-third-stage.component.scss']
})
export class MarineThirdStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
