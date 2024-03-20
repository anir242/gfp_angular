import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProjectsPartnersInterface} from '../../../../../../_models/api/projects/projects-partners-interface';
import {PartnersPublicService} from '../../../../../../_services/public/partners.public.service';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {Response} from '../../../../../../_models/api/response';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() items: any;
  @Input() bgColor: 'light';
  constructor(
  ) {
  super();
}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
