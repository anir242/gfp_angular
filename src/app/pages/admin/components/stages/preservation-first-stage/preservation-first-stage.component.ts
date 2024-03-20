import {AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HeaderStagesComponent} from '../header-stages/header-stages.component';
import {StagesComponent} from '../stages.component';

@Component({
  selector: 'app-preservation-first-stage',
  templateUrl: './preservation-first-stage.component.html',
  styleUrls: ['./preservation-first-stage.component.scss']
})
export class PreservationFirstStageComponent extends StagesComponent implements OnInit{
  constructor() {
    super();
  }
  ngOnInit(): void {
  }
}
