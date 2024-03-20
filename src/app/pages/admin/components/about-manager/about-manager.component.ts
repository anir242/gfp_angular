import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {ProjectDataInterface} from '../../../../_models/api/projects/project-data-interface';
import {ProjectTypesInterface} from '../../../../_models/api/projects/project-types-interface';
import { ProjectGalleryInterface } from '../../../../_models/api/projects/project-gallery-interface';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {ProjectsInterface} from '../../../../_models/api/projects/projects-interface';
import {CountryInterface} from '../../../../_models/api/country-interface';
import {SharedDataProjectService} from '../../../../_services/projects/shared-data-project.service';
import {Response} from '../../../../_models/api/response';
import {ProjectsService} from '../../../../_services/projects/projects.service';
import { GalleryService } from '../../../../_services/gallery.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-about-manager',
  templateUrl: './about-manager.component.html',
  styleUrls: ['./about-manager.component.scss'],
})
export class AboutManagerComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild('support', {static: true}) support: ElementRef;
  @ViewChild('problem', {static: true}) problem: ElementRef;
  items: any[];
  slug: string;
  url: string;
  hideButton: boolean;
  max = 0;
  @Input() public: boolean = false;
  project: ProjectsInterface;
  projectGalleryInterface: ProjectGalleryInterface[];
  carouselImages = [];
  private dark: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sharedDataProjectService: SharedDataProjectService,
    private projectsService: ProjectsService,
    private galleryService: GalleryService
  ) {
    super();
  }

  projectData: ProjectDataInterface;
  projectType: ProjectTypesInterface;
  country: CountryInterface;

  bgColorAbout: any;
  x = window.matchMedia('(max-width: 767px)');

  ngOnInit(): void {
    this.country = this.sharedDataProjectService.project.country;
    this.projectType = this.sharedDataProjectService.project.type;
    this.projectData = this.sharedDataProjectService.project.projectData;
    if (this.projectData) {
      this.items = [
        {
          image: 'https://green-future-project.s3.eu-central-1.amazonaws.com/ea34ed0a-0a2a-4f44-9cfd-b126a84fd345',
          species: this.projectData.birdSpecies,
          labelSpecies: this.translate.instant('about.birdSpecies')
        },
        {
          image: 'https://green-future-project.s3.eu-central-1.amazonaws.com/1486ff1a-5742-4292-a2a6-34b32d773860',
          species: this.projectData.mammalSpecies,
          labelSpecies: this.translate.instant('about.mammalSpecies')
        },
        {
          image: 'https://green-future-project.s3.eu-central-1.amazonaws.com/75dc57b0-6f25-45a2-bd02-7710ec63b04e',
          species: this.projectData.amphibianSpecies,
          labelSpecies: this.translate.instant('about.amphibianSpecies')
        }
      ];
      this.loadImages().then();
    }

  }

  setGradient(): any {
    let styles;
    if (this.x.matches) {
      styles = {
        background: `linear-gradient(0deg, ${this.projectType.colorSecondary} 50%, ${this.dark} 50%)`,
      };
    } else {
      styles = {
        background: `linear-gradient(90deg, ${this.dark} 50%, ${this.projectType.colorSecondary} 50%)`
      };
    }
    return styles;
  }

  getBackgroundColor = () => {
    return {
      'background-color': this.projectType.colorLabel,
    };
  }

  isRenewable(): boolean {
    return this.projectType.slug === ProjectTypes.renewable_energy;
  }

  isMarine(): boolean {
    return this.projectType.slug === ProjectTypes.marine_restoration;
  }

  isVicenza(): boolean {
    return this.project?.name === 'Vicenza';
  }

  loadImages = async () => {
    this.slug = this.sharedDataProjectService.project.slug;
    try {
      let response: Response<ProjectsInterface>;
      if (this.public) {
        response = await this.projectsService.getPublicProjectBySlug(this.slug);
      } else {
        response = await this.projectsService.getProjectBySlug(this.slug);
      }
      if (response?.success) {
        if (response.data.type?.slug === ProjectTypes.renewable_energy || response.data.name == 'Vicenza') {
          this.hideButton = true;
        } else {
          this.hideButton = false;
        }
        this.project = response.data;
        this.url = this.project.projectData.reportUrl;
        await this.getProjectGallery();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getProjectGallery = async () => {
    try {
      let response: Response<ProjectGalleryInterface[]>;
      if (this.public) {
        response = await this.galleryService.getGalleryPublic(this.project.slug);
      } else {
        response = await this.galleryService.getGallery(this.project.slug);
      }
      if (response?.success) {
        this.projectGalleryInterface = response.data;
        this.createImagesArray(this.projectGalleryInterface, this.carouselImages);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  createImagesArray(initialData: any, finalData: any[]): void {
    initialData.forEach(item => {
      finalData.push({ path: item.image.url });
    });
  }

  downloadReport = () => {
    this.router.navigate([]).then(result => {
      window.open(this.url, '_blank');
    });
  }

  ngAfterViewInit(): void {
    this.dark = getComputedStyle(this.support?.nativeElement).color;
    window.dispatchEvent(new Event('resize'));
  }

  async getHeight(): Promise<any> {
    this.max = 0;
    if (this.x.matches) {
      await this.delay(250);
      const supportHeight = getComputedStyle(this.support.nativeElement).height.replace('px', '');
      const problemHeight = getComputedStyle(this.problem.nativeElement).height.replace('px', '');
      this.max = Math.max(Number(supportHeight), Number(problemHeight));
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onResize(event: any): void {
    this.getHeight().then();
  }
}

