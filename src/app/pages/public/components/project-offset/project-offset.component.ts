import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-offset',
  templateUrl: './project-offset.component.html',
  styleUrls: ['./project-offset.component.scss']
})
export class ProjectOffsetComponent implements OnInit {

  data = [
    {
      id: 1,
      isSelected: true,
    },
    {
      id: 2,
      isSelected: false,
    },
    {
      id: 3,
      isSelected: false,
    },
  ]
  selectedData: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
