import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DetailTableComponent implements OnInit {

  @Input() columnsToDisplay: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  canSeeData = (key: any) => {
    return key !== '__v' &&
      key !== '_id' &&
      key !== 'app' &&
      key !== 'createdAt' &&
      key !== 'updatedAt' &&
      this.columnsToDisplay.indexOf(key.toString()) === -1;
  }

}
