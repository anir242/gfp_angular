import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../../../../_models/api/response';
import {ProjectGalleryInterface} from '../../../../../_models/api/projects/project-gallery-interface';
import {GalleryService} from '../../../../../_services/gallery.service';

@Component({
  selector: 'app-gallery-manager',
  templateUrl: './gallery-manager.component.html',
  styleUrls: ['./gallery-manager.component.scss']
})
export class GalleryManagerComponent extends BaseComponent implements OnInit {
  slug: string;
  projectGalleryInterface: ProjectGalleryInterface[] = [];
  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,

  ) {
    super();
  }

  ngOnInit(): void {
    this.getProjectGallery().then();
  }

  getProjectGallery = async () => {
    try {
      this.route.parent.params.subscribe(params => {
        this.slug = params.slug;
      });
      const response: Response<ProjectGalleryInterface[]> = await this.galleryService.getGallery(this.slug);
      if (response?.success) {
        this.projectGalleryInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }
}
