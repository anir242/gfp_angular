import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-renewable-second-stage',
  templateUrl: './renewable-second-stage.component.html',
  styleUrls: ['./renewable-second-stage.component.scss']
})
export class RenewableSecondStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
