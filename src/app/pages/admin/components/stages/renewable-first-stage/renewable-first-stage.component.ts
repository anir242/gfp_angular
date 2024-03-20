import { Component, OnInit } from '@angular/core';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-renewable-first-stage',
  templateUrl: './renewable-first-stage.component.html',
  styleUrls: ['./renewable-first-stage.component.scss']
})
export class RenewableFirstStageComponent extends StagesComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {

  }

}
