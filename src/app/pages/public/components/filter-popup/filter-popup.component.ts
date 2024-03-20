import {Component, Inject, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FilterService} from '../../../../_services/public/local/filter.service';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.scss']
})
export class FilterPopupComponent extends BaseComponent implements OnInit {
  continent = this.translate.instant('projectList.allContinents');
  typology =  this.translate.instant('projectList.allProjects');

  constructor(
    public filterService: FilterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
