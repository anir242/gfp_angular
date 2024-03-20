import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-marine-fourth-stage',
  templateUrl: './marine-fourth-stage.component.html',
  styleUrls: ['./marine-fourth-stage.component.scss']
})
export class MarineFourthStageComponent extends StagesComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
