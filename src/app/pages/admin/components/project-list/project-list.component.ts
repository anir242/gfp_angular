import {Component, Input, OnInit} from '@angular/core';
import {UserProjectsInterface} from '../../../../_models/api/projects/user-projects-interface';
import {BaseComponent} from '../../../_base/base/base.component';
import {ProjectsInterface} from '../../../../_models/api/projects/projects-interface';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Orientation} from '../../../../_models/components/orientation';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {environment} from '../../../../../environments/environment';
import {Response} from '../../../../_models/api/response';
import {SinglePaymentPacksInterface} from '../../../../_models/api/public/single-payment-packs-interface';
import { SinglePaymentPacksService } from '../../../../_services/public/single-payment-packs.service';
import { RoutingTypes } from 'src/app/_models/components/routing-types';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends BaseComponent implements OnInit {

  @Input() userProjects: UserProjectsInterface[] = [];
  @Input() projectsInterface: ProjectsInterface[] = [];
  @Input() public: boolean = false;
  @Input() isAdmin: boolean = false;
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  activeProject: ProjectsInterface;
  orientation: string;
  maxWidth = '(max-width: 767px)';
  minWidth = '(min-width: 768px)';
  selected: boolean;
  projectSlug: string;
  @Input() enableSupport: boolean = environment.enableSupport;
  displayNameMap = {
    '(max-width: 767px)': Orientation.horizontal,
    '(min-width: 768px)': Orientation.vertical,
  };
  companyId: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private singlePaymentPacksService: SinglePaymentPacksService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setOrientation();
    this.selected = false;
    this.setLang();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.projectsInterface.forEach(project => {
        project.country.name = project.country.name_it;
        project.type.name = project.type.name_it;
        project.projectData.overview = project.projectData.overview_it;
      });
    }
  }

  openProject = async (id: string, admin: boolean = false) => {
    if (this.isAdmin) {
        await this.router.navigate(['admin', 'projects', id]);
    } else {
      if (!this.public) {
        await this.router.navigate(['projects', id]);
      } else {
        const company = this.router.url.split('/')[2];
        await this.router.navigate(['company', company, id]);
      }
    }
  }

  projectSuperpowers = async (prj: ProjectsInterface) => {
    this.selected = true;
    this.activeProject = prj;
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
    if (!activeProject.isActive) {
      bgJson.opacity = '0.7';
    }
    return bgJson;
  }


  private setOrientation(): void {
    this.orientation = Orientation.horizontal;
  }

  private setOrientationOld(): void {
    if (this.breakpointObserver.isMatched(this.maxWidth)) {
      this.orientation = Orientation.horizontal;
    } else {
      this.orientation = Orientation.vertical;
    }
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.orientation = this.displayNameMap[query];
        }
      }
    });
  }

  isRenewable(prj: ProjectsInterface): boolean {
    return prj.type.slug === ProjectTypes.renewable_energy;
  }

  isMarine(prj: ProjectsInterface): boolean {
    return prj.type.slug === ProjectTypes.marine_restoration;
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.activeProject.slug);
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

  goToLive = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'live'])
 }
}
