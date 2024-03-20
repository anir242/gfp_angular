import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../../../_base/base/base.component';
import { ProjectsService } from '../../../../../_services/projects/projects.service';
import {ProjectsInterface} from '../../../../../_models/api/projects/projects-interface';
import {Response} from '../../../../../_models/api/response';
import {ProjectTypes} from '../../../../../_models/components/project-types';
import {SharedDataProjectService} from '../../../../../_services/projects/shared-data-project.service';
import {StorageName} from '../../../../../_models/components/storage-name';
import {CountersInterface} from '../../../../../_models/api/counters-interface';
import {CompanyService} from '../../../../../_services/companies/company.service';
import {UsersService} from '../../../../../_services/users/users.service';
import {CounterValues} from '../../../../../_models/components/counter-values';
import {CountersDataInterface} from '../../../../../_models/api/counters-data-interface';
import {environment} from '../../../../../../environments/environment';
import {ShareFriendsComponent} from '../../../../../components/share-friends/share-friends.component';
import {SinglePaymentPacksInterface} from "../../../../../_models/api/public/single-payment-packs-interface";
import {SinglePaymentPacksService} from "../../../../../_services/public/single-payment-packs.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent extends BaseComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private sharedDataProjectService: SharedDataProjectService,
    private companyService: CompanyService,
    private singlePaymentPacksService: SinglePaymentPacksService,
    private usersService: UsersService
  ) {
    super();
  }

  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  projectTypes = ProjectTypes;
  activeLink = this.translate.instant('about');
  slug: string;
  projectSlug: string;
  project: ProjectsInterface;
  totalUserKw = 0;
  totalTonsOffsetted = 0;
  links: string[];
  kmRomeNewYork = 6883.87;
  tonsCo2Km = 6700;
  percentTrees = 0;
  percentAcres = 0;
  nextCourt = 0;
  flights = 0;
  countersInterface: CountersDataInterface;
  totalTons = 0;
  houseHolds = 0;
  remainder = 0;
  remainderFlights = 0;
  totalData = 0;
  item = 0;
  url = environment.url;
  tonnesOnly: boolean = false;
  popUpCO2 = this.translate.instant('projectDetails.popUpCO2');
  popUpTrees = this.translate.instant('projectDetails.popUpTreesH');
  titleCO2 = this.translate.instant('projectDetails.infoCO2');
  titleTrees = this.translate.instant('projectDetails.infoTrees');
  public: boolean = false;
  name: string;

  ngOnInit(): void {
    this.slug = this.route.snapshot.params.slug;
    this.url = this.url + this.router.url;    
    this.sharedDataProjectService.counters = null;
    this.public = this.router.url.startsWith('/company');
    this.addImpactEnabled = !this.public;
    this.getName();
    this.loadProject().then();
  }

  getName(): void {
    let name = localStorage.getItem(StorageName.companyName);
    if (!name) {
      name = localStorage.getItem(StorageName.name);
      if (!name) {
        const userData = localStorage.getItem(StorageName.userData);
        if (userData) {
          name = JSON.parse(userData).firstName;
        }
      } 
    }
    if (name) {
      if (localStorage.getItem('lang') != 'it') {
        name += '\'s';
      }
    } else {
      if (localStorage.getItem('lang') != 'it') {
        name = 'Your';
      } else {
        name = 'Il tuo'
      }
    }
    this.name = name;
  }

  loadProject = async () => {
    this.ngxService.start();
    try {
      let response: Response<ProjectsInterface>;
      if (this.public) {
        response = await this.projectsService.getPublicProjectBySlug(this.slug);
      } else {
        response = await this.projectsService.getProjectBySlug(this.slug);
      }
      
      if (response?.success) {
        if (response.data.type.slug === ProjectTypes.renewable_energy) { // hide gallery on renewable projects
          this.links = ['about', 'yourImpact'];
        } else {
          this.links = ['about', 'yourImpact', 'gallery'];
        }
        this.project = response.data;
        this.sharedDataProjectService.project = response.data;
        this.projectSlug = this.project.type.slug;
        this.setLang();
        await this.getPayments();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      //this.projectInterface.name = this.projectInterface.name_it;
      this.project.description = this.project.description_it;
      this.project.country.name = this.project.country.name_it;
      this.project.country.continentName = this.project.country.continentName_it;
      this.project.projectData.overview = this.project.projectData.overview_it;
      this.project.projectData.scope = this.project.projectData.scope_it;
      this.project.projectData.biodiversity = this.project.projectData.biodiversity_it;
      this.project.projectData.specialCharacteristics = this.project.projectData.specialCharacteristics_it;
      this.project.projectData.ecosystem = this.project.projectData.ecosystem_it;
      this.project.projectData.absorption = this.project.projectData.absorption_it;
      this.project.projectData.problem = this.project.projectData.problem_it;
      this.project.projectData.support = this.project.projectData.support_it;
      this.project.projectData.economicDevelopment = this.project.projectData.economic_development_it;
    } else if (selectedLang == 'jp') {
      //this.projectInterface.name = this.projectInterface.name_it;
      this.project.description = this.project.description_jp;
      this.project.country.name = this.project.country.name_jp;
      this.project.country.continentName = this.project.country.continentName_jp;
      this.project.projectData.overview = this.project.projectData.overview_jp;
      this.project.projectData.scope = this.project.projectData.scope_jp;
      this.project.projectData.biodiversity = this.project.projectData.biodiversity_jp;
      this.project.projectData.specialCharacteristics = this.project.projectData.specialCharacteristics_jp;
      this.project.projectData.ecosystem = this.project.projectData.ecosystem_jp;
      this.project.projectData.absorption = this.project.projectData.absorption_jp;
      this.project.projectData.problem = this.project.projectData.problem_jp;
      this.project.projectData.support = this.project.projectData.support_jp;
      this.project.projectData.economicDevelopment = this.project.projectData.economic_development_jp;
    }
  }

  retrieveStyleBackground(): any {
    return {
      background: 'url(' + this.project.image.url + ') no-repeat',
      'background-size': 'cover',
      'background-position': '50% 50%',
    };
  }

  isRestoration = (): boolean => {
    return this.project.type.slug === ProjectTypes.restoration;
  }
  isMarineRestoration = (): boolean => {
    return this.project.type.slug === ProjectTypes.marine_restoration;
  }
  isPreservation = (): boolean => {
    return this.project.type.slug === ProjectTypes.preservation;
  }
  isRenewable = (): boolean => {
    return this.project.type.slug === ProjectTypes.renewable_energy;
  }

  getCounters = async () => {
    try {
      const companyId = localStorage.getItem(StorageName.companyId);
      const userId = localStorage.getItem(StorageName.id);
      let response: Response<CountersInterface>;
      const params: any = {
        projectSlug: this.slug,
        projectTypeSlug: this.projectSlug
      };
      if (!this.public) {
        if (this.canSeeCompanyData()) {
          response = await this.companyService.getCompanyCounters(companyId, params);
        } else {
          response = await this.usersService.getUserCounters(userId, params);
        }
      } else {
        response = await this.companyService.getCompanyPublicCounters(companyId, params);
      }
      if (response?.success) {
        let counterValue;
        if (this.tonnesOnly) {
          this.countersInterface = response.data.tonnes;
          counterValue = CounterValues.tonne_flight;
        } else {
          switch (this.project.type.slug) {
            case ProjectTypes.preservation: {
              this.countersInterface = response.data.preservation;
              counterValue = CounterValues.acre_tennisCourt;
              break;
            }
            case ProjectTypes.renewable_energy: {
              this.countersInterface = response.data.renewable_energy;
              counterValue = CounterValues.kw_household;
              break;
            }
            case ProjectTypes.marine_restoration: {
              this.countersInterface = response.data.marine_restoration;
              counterValue = CounterValues.tree_tennisCourt;
              break;
            }
            default: {
              this.countersInterface = response.data.restoration;
              counterValue = CounterValues.tree_tennisCourt;
              break;
            }
          }
        }

        this.sharedDataProjectService.counters = this.countersInterface;
        this.totalData = this.roundNumber(this.countersInterface.unit);
        const values = this.getPercentages(this.totalData, counterValue, this.remainder);
        this.item = this.roundNumber(values[0]);
        this.remainder = this.roundNumber(values[1]);
        this.totalTons = this.roundNumber((this.countersInterface.certified + this.countersInterface.notCertified) / 1000);
        const valuesFlight = this.getPercentagesFlights(this.totalTons, this.remainderFlights);
        this.flights = this.roundNumber(valuesFlight[0]);
        this.remainderFlights = this.roundNumber(valuesFlight[1]);
        // this.sharedDataProjectService.counters.unit = this.totalData;
      } else {
        this.showErrorResponse(response);
      }

    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getPercentages(value1: number, value2: number, remainder: number): number[] {
    let temp = value1 * value2;
    remainder = temp % 1 * 100;
    temp = Math.floor(temp);
    remainder = Math.floor(remainder);
    const values = [temp, remainder];
    return values;
  }

  getPercentagesFlights(value1: number, remainder: number): number[] {
    let temp = (value1 * this.tonsCo2Km) / this.kmRomeNewYork;
    remainder = temp % 1 * 100;
    temp = Math.floor(temp);
    remainder = Math.floor(remainder);
    const values = [temp, remainder];
    return values;
  }

  twoDecimalPlaces(value: number): number {
    return Math.floor(value * 100) / 100;
  }

  inviteAFriend(): void {
    //  this.router.navigate(['welcomeOnBoard/share']);
    const dialog = this.dialog.open(ShareFriendsComponent, {panelClass: 'noPadding'});
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.slug);
      if (response?.success) {
        if (response.data) {
          this.singlePaymentPacksInterface = response.data;
          this.tonnesOnly = this.singlePaymentPacksInterface?.unit?.slug == 'tonne';
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    await this.getCounters();
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

  goToLive = async (slug: string): Promise<void> => {
     await this.router.navigate(['projects', slug, 'live'])
  }

}

