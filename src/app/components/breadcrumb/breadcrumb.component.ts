import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../_services/_base/breadcrumb.service';
import {Breadcrumb} from '../../_models/components/breadcrumb';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() dark = false;

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

  ngOnInit(): void {
  }

}
