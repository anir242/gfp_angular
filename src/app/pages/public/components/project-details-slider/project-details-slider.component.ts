import {Component, Input, OnInit} from '@angular/core';
import {Response} from '../../../../_models/api/response';
import {ProjectGalleryInterface} from '../../../../_models/api/projects/project-gallery-interface';
import {BaseComponent} from '../../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import {GalleryService} from '../../../../_services/gallery.service';

@Component({
  selector: 'app-project-details-slider',
  templateUrl: './project-details-slider.component.html',
  styleUrls: ['./project-details-slider.component.scss']
})
export class ProjectDetailsSliderComponent extends BaseComponent implements OnInit {
  @Input() images: any[];
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
