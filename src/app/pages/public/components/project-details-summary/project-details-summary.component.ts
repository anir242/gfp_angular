import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-details-summary',
  templateUrl: './project-details-summary.component.html',
  styleUrls: ['./project-details-summary.component.scss']
})
export class ProjectDetailsSummaryComponent implements OnInit {
  @Input() mainTitle;
  @Input() items;
  constructor() { }

  ngOnInit(): void {
  }

}
