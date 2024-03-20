import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ProjectsInterface } from '../../../../../../_models/api/projects/projects-interface';
import { Response } from '../../../../../../_models/api/response';
import { ViewTypes } from '../../../../../../_models/components/viewTypes';
import { ProjectsService } from '../../../../../../_services/projects/projects.service';
import { FilterService } from '../../../../../../_services/public/local/filter.service';
import { ScriptService } from '../../../../../../_services/script.service';
import { BaseComponent } from '../../../../../_base/base/base.component';
import { FilterPopupComponent } from '../../../../components/filter-popup/filter-popup.component';

@Component({
  selector: 'app-projects-public',
  templateUrl: './projects-public.component.html',
  styleUrls: ['./projects-public.component.scss']
})
export class ProjectsPublicComponent extends BaseComponent implements OnInit {
  projects: ProjectsInterface[];
  filteredProjects: ProjectsInterface[];
  selectedProject: ProjectsInterface;
  projectTypes = [];
  continent = [];
  total: number;
  searchInput = new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
  totalProjects = 2;
  defaultInput = '';
  viewType = ViewTypes.list;
  viewTypes = ViewTypes;
  maxWidth = '(max-width: 768px)';
  minWidth = '(min-width: 767px)';
  cardType: 'big' | 'small';
  pageTitle: string;
  selectedType: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private filterService: FilterService,
    private projectService: ProjectsService,
    private scriptService: ScriptService,
    private route: ActivatedRoute,
  ) {
    super();
  }
  ngOnInit(): void {
    this.loadProjects();
    this.searchProject();
    this.setCardType();
    this.getClientType();
    //this.scriptService.load('googleTranslateInit', 'googleTranslate').then(data => {}).catch(error => console.log(error));
  }

  getClientType(): void {
    const clientType = localStorage.getItem('clientType');
    if (clientType === '2') {
      this.pageTitle = this.translate.instant('projectList.investProject');
    } else {
      this.pageTitle = this.translate.instant('projectList.projects');
    }
  }

  selectProject(event): any {
    this.selectedProject = this.filteredProjects.filter(x => x.slug === event)[0];
    return [this.selectedProject.projectData.latitude, this.selectedProject.projectData.longitude];
  }

  searchProject(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(x => {
        if (x !== "" || (x === "" && this.total !== this.filterProject.length)) {
          this.filteredProjects = this.projects.filter(y =>
            y.name.toLowerCase().includes(x.toLowerCase())
          );
          this.total = this.filteredProjects.length;
        }
      });
  }

  getType(): void {
    this.route.queryParams.subscribe(
      res => {

        if (!res.type) {
          return;
        }
        this.selectedType = this.translate.instant('projectType.' + res.type);
        this.filterService.addFilter(this.selectedType, 'typology');
      }
    )
  }

  filterProject(): void {
    this.filterService.dataUpdated.subscribe(() => {
      this.defaultInput = '';
      this.saveSelection();
      this.total = this.filterProject.length;
    });
  }
  loadProjects = async () => {
    try {
      const response: Response<ProjectsInterface[]> = await this.projectService.getPublicProjects();
      if (response?.success) {
        this.projects = response.data;
        this.selectedProject = this.projects[0];
        this.filteredProjects = this.projects;
        this.total = this.projects.length;
        this.setLang();
        this.getData();
        this.filterProject();
        this.getType();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.filteredProjects.forEach(project => {
        project.country.name = project.country.name_it;
        project.type.name = project.type.name_it;
        project.projectData.overview = project.projectData.overview_it;
      });
    }
  }

  getData(): void {
    this.continent = this.projects.map(item => item.country.continentName).sort();
    this.continent = this.removeDuplicate(this.continent);
    this.continent.unshift(this.translate.instant('projectList.allContinents'));

    this.projectTypes = this.projects.map(item => item.type.name).sort();
    this.projectTypes = this.removeDuplicate(this.projectTypes);
    this.projectTypes.unshift(this.translate.instant('projectList.allProjects'));
  }

  removeDuplicate(data: any): any {
    data = data.filter((element, i) => i === data.indexOf(element));
    return data;
  }

  openFilterPopup(): void {
    const dialog = this.dialog.open(FilterPopupComponent, {
      data: {
        continent: this.continent,
        projectTypes: this.projectTypes,
        type1: 'typology',
        type2: 'continent',
        label1: this.translate.instant('projectList.typology'),
        label2: this.translate.instant('projectList.continent'),
      }, width: '80%'
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.defaultInput = '';
        this.saveSelection();
      }
    });
  }
  saveSelection(): void {
    const items = this.filterService.getItems();
    if (items.continent === this.translate.instant('projectList.allContinents') && items.typology === this.translate.instant('projectList.allProjects')) {
      this.filteredProjects = this.projects;
    }
    else if (items.continent === this.translate.instant('projectList.allContinents')) {
      this.filteredProjects = this.projects.filter(x =>
        (x.type.name === items.typology)
      );
    }
    else if (items.typology === this.translate.instant('projectList.allProjects')) {
      this.filteredProjects = this.projects.filter(x =>
        x.country.continentName === items.continent
      );
    } else {
      this.filteredProjects = this.projects.filter(x =>
        (x.country.continentName === items.continent) && (x.type.name === items.typology)
      );
    }
    this.total = this.filteredProjects.length;
  }

  addProjects(): void {
    this.totalProjects += 1;
  }
  setCardType(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      if (result.breakpoints[this.minWidth]) {
        this.cardType = 'small';
      } else {
        this.cardType = 'big';
        this.viewType = ViewTypes.list;
      }
    });
  }

  resetFilters(): void {
    this.filterService.resetFilter();
    this.defaultInput = '';
  }
}
