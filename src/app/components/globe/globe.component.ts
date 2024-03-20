import {Component, EventEmitter, OnInit, Output, Input, HostListener} from '@angular/core';
import { ModelViewerElement } from '@google/model-viewer';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {ProjectSlugs} from '../../_models/components/project-slugs';
import {ProjectTypes} from '../../_models/components/project-types';
import {ProjectsInterface} from '../../_models/api/projects/projects-interface';
import { ProjectsService } from 'src/app/_services/projects/projects.service';
import {Response} from '../../_models/api/response';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent extends BaseComponent implements OnInit {

  @Input() projects: ProjectsInterface[];
  @Input() isDashboardHome: boolean | undefined;
  selected: ProjectsInterface;

  selectedSlug: string;
  selectedName: string;
  selectedType: string;
  selectedImage: string;

  indonesia = ProjectSlugs.INDONESIA;
  india = ProjectSlugs.INDIA;
  madagascar = ProjectSlugs.MADAGASCAR;
  canande = ProjectSlugs.CANANDE;
  yanacocha = ProjectSlugs.YANACOCHA;
  narupa = ProjectSlugs.NARUPA;
  bajo = ProjectSlugs.BAJO;
  vicenza = ProjectSlugs.VICENZA;

  @Input() page: string = 'landing';

  constructor(private projectService: ProjectsService,) {
    super();
  }

  ngOnInit(): void {
    this.loadProjects().then();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const modelViewer = document.getElementById('myModelViewer');
    if (event.target.innerWidth <= 600) {
      modelViewer.setAttribute('disable-zoom', '');
    } else {
      modelViewer.removeAttribute('disable-zoom');
    }
  }

  openProject = async (slug: string): Promise<void> => {
    await this.router.navigate(['admin/projects', slug]);
  }

  clickHotspot(event, slug): void {

    const modelViewer: ModelViewerElement = event.parentNode;
    const hotspot = event.getElementsByClassName('hotspotPopUp')[0];
    if (hotspot !== undefined){
      if (hotspot.classList.value.includes('active')){
        hotspot.classList.remove('active');
        modelViewer.autoRotate = true;
      }else{
        const hotspots = modelViewer.getElementsByClassName('hotspotPopUp');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < hotspots.length; i++){
          if (hotspots[i].classList.value.includes('active')){
            hotspots[i].classList.remove('active');
          }
        }
        hotspot.classList.add('active');
        modelViewer.autoRotate = false;
      }
    }
    this.projects.forEach((project) => {
      if(project.slug == slug){
        this.selected = project;
      }
    });
    this.selectedSlug = this.selected.slug;
    this.selectedName = this.selected.name;
    this.selectedType = this.selected.type.name;
    this.selectedImage = this.getBackground(this.selected);

  }

  loadProjects = async () => {
    try {
      const response: Response<ProjectsInterface[]> = await this.projectService.getPublicProjects();
      if (response?.success) {
        this.projects = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('projects');
  }

  getBackground = (activeProject: ProjectsInterface): any => {
    const bgJson: any = {};
    bgJson.background = `url(${activeProject.image.url})`;
    return bgJson;
  }

  showButtons(): boolean {
    let consent: boolean = false;
    const termlyKey = localStorage.getItem('TERMLY_API_CACHE');
    if (termlyKey) {
      const termly = JSON.parse(termlyKey);
      if (termly.TERMLY_COOKIE_CONSENT) {
        consent = true;
      }
    }
    return this.page != 'welcome' && consent;
  }

  setBackgroundByProjectType = (value: string): string => {
    switch (value) {
      case this.india:
        return ProjectTypes.renewable_energy;
      case this.madagascar:
      case this.yanacocha:
      case this.indonesia:
      case this.vicenza:
        return ProjectTypes.restoration;
      case this.canande:
      case this.bajo:
      case this.narupa:
        return ProjectTypes.preservation;
    }
  }
}
