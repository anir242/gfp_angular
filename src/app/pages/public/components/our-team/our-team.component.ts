import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {TeamInterface} from '../../../../_models/api/public/team-interface';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent extends BaseComponent implements OnInit {
  @Input() team: TeamInterface[];
  @Input() business: boolean;
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
