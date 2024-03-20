import {Compiler, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import {Response} from '../../../../../../_models/api/response';
import {
  ProjectTypologyInterface,
} from '../../../../../../_models/api/public/project-typology-interface';
import {
  ProjectsInterface,
} from '../../../../../../_models/api/projects/projects-interface';
import {ProjectTypologyService} from '../../../../../../_services/public/project-typology.service';
import {ProjectsService} from '../../../../../../_services/projects/projects.service';
import {hexToCSSFilter} from '../../../../../../_models/components/hexToCSSFilter';
import {html} from 'lit-element';

@Component({
  selector: 'app-project-typology',
  templateUrl: './project-typology.component.html',
  styleUrls: ['./project-typology.component.scss']
})
export class ProjectTypologyComponent extends BaseComponent implements OnInit {
  slug: string;
  projectTypologyInterface: ProjectTypologyInterface;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private projectTypologyService: ProjectTypologyService,
    private projectService: ProjectsService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe((params) => {
      this.slug = params.slug;
      if (this.slug == 'projects') {
        this.router.navigate(['projects'])
      } else {
        this.getTypologyData().then();
      }
    });
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.projectTypologyInterface.name = this.projectTypologyInterface.name_it;
      this.projectTypologyInterface.description = this.projectTypologyInterface.description_it;
      this.projectTypologyInterface.titleData = this.projectTypologyInterface.titleData_it;
      this.projectTypologyInterface.firstDataDescription = this.projectTypologyInterface.firstDataDescription_it;
      this.projectTypologyInterface.secondDataDescription = this.projectTypologyInterface.secondDataDescription_it;
      this.projectTypologyInterface.thirdDataDescription = this.projectTypologyInterface.thirdDataDescription_it;
      this.projectTypologyInterface.problem = this.projectTypologyInterface.problem_it;
      this.projectTypologyInterface.solution = this.projectTypologyInterface.solution_it;
    }
  }

  async getTypologyData(): Promise<void>{
    try {
      const response: Response<ProjectTypologyInterface> = await this.projectTypologyService.getProjectTypeBySlug(this.slug);
      if (response?.success) {
        this.projectTypologyInterface = response.data;
        if (!this.projectTypologyInterface.projects) {
          const projects: Response<ProjectsInterface[]> = await this.projectService.getPublicProjects({projectType: this.slug});
          if (projects?.success) {
            this.projectTypologyInterface.projects = projects.data;
          }
        }
        this.setLang();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }

  setBg(url): any {
    const styles = {
        'background-image': 'url(' + url + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-size': 'cover'
      };
    return styles;
  }

  setColor = (color: string) => {
    return {
      'background-color': color,
    };
  }

  getBackground = (activeProject: ProjectsInterface): any => {
    const bgJson: any = {};
    if (activeProject.miniatureImageId) {
      bgJson.background = `url(${activeProject.miniatureImage.url})`;
    } else {
      bgJson.background = `url(${activeProject.image.url})`;
    }
    bgJson['background-size'] = 'cover';
    bgJson['background-position'] = 'center center';
    bgJson['background-repeat'] = 'no-repeat';
    return bgJson;
  }

  goToProjects(): void {
    this.router.navigate(['projects'])
  }

  goToProject(slug): void {
    this.router.navigate(['projects', slug])
  }
}
