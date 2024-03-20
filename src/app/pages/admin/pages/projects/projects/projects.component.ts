import {Component, OnInit} from '@angular/core';
import {Response} from '../../../../../_models/api/response';
import {ProjectsInterface} from '../../../../../_models/api/projects/projects-interface';
import {UserProjectsService} from '../../../../../_services/projects/user-projects.service';
import {BaseComponent} from '../../../../_base/base/base.component';
import {ProjectTypes} from '../../../../../_models/components/project-types';
import {ProjectsService} from '../../../../../_services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  projectsInterface: ProjectsInterface[] = [];
  selectedProject: string;
  isActiveProject = null;
  selected = -1;
  projectTypes = [];
  checkboxType = [
    {name: this.translate.instant('projects.supporting')},
    {name: this.translate.instant('projects.notSupporting')}
  ];
  constructor(
    private userProjectsService: UserProjectsService,
    private projectsService: ProjectsService,
  ) {
    super();
  }

  ngOnInit(): void {
/*    if (this.router.url === '/projects') {
      r = 'dark';
    }*/
    this.selectedProject = this.translate.instant('projects.allProjects');
    this.projectTypes.push(
      this.translate.instant('projects.allProjects'),
      ProjectTypes.restoration,
      ProjectTypes.preservation,
      ProjectTypes.renewable_energy,
      ProjectTypes.marine_restoration
    );
    this.loadProjects().then();
  }

  /*  loadProjects = async () => {
      try {
        const userId = localStorage.getItem(StorageName.id);
        const params: any = {
          projectType: this.selectedProject,
          activeProject: false
        };
        this.ngxService.start('projects');
        const response: Response<ProjectsInterface[]> = await this.userProjectsService.getUserProjects(userId, params);
        if (response?.success) {
          this.projectsInterface = response.data;
          this.setLang();
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
      this.ngxService.stop('projects');
    }*/

    setLang(): void {
      const selectedLang = localStorage.getItem('lang');
      if (selectedLang == 'it') {
        this.projectsInterface.forEach(project => {
          project.country.name = project.country.name_it;
          project.type.name = project.type.name_it;
          project.projectData.overview = project.projectData.overview_it;
          project.type.description = project.type.description_it;
        });
      } else if (selectedLang == 'jp') {
        this.projectsInterface.forEach(project => {
          project.country.name = project.country.name_jp;
          project.type.name = project.type.name_jp;
          project.projectData.overview = project.projectData.overview_jp;
        });
      }
    }

  loadProjects = async () => {
    try {
      const params: any = {};
      if (this.isActiveProject != null) {
          params.activeProject = this.isActiveProject;
      }
      if (this.selectedProject != null) {
        if (this.selectedProject !== this.translate.instant('projects.allProjects')) {
          params.projectType = this.selectedProject;
        }
      }
      const response: Response<ProjectsInterface[]> = await this.projectsService.getProjects(params);
      if (response?.success) {
        this.projectsInterface = response.data;
        this.setLang();
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

  onChange(event: any): void {
    this.selectedProject = event.source.selected.value;
    this.loadProjects().then();
  }

  isSupporting(event: any, nActive: number): void {
    switch (nActive) {
      case 0: {
        if (event.checked) {
          this.isActiveProject = true;
        } else {
          this.isActiveProject = null;
        }
        break;
      }
      case 1: {
        if (event.checked) {
          this.isActiveProject = false;
        } else {
          this.isActiveProject = null;
        }
        break;
      }
    }
    this.loadProjects().then();
  }

  /*  filterProjects = async () => {
      const params = {
        projectType: this.selectedProject,
        activeProject: true,
      };
      try {
        this.ngxService.start('projects');
        const response: Response<ProjectsInterface[]> = await this.projectsService.getProjectByFilter(params);
        if (response?.success) {
          if (this.selectedProject !== undefined){
            this.projectsInterface = response.data;
          }
        } else {
          this.showErrorResponse(response);
        }
      } catch (e) {
        this.showErrorResponse(e);
      }
      this.ngxService.stop('projects');
    }*/

  openProject = async (project: ProjectsInterface) => {
     await this.router.navigate(['admin/projects', project.slug]);
  }
}
