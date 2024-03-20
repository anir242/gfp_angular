import {Component, OnInit} from '@angular/core';
import {StorageName} from '../../../../_models/components/storage-name';
import {UsersService} from '../../../../_services/users/users.service';
import {Response} from '../../../../_models/api/response';
import {UsersInterface} from '../../../../_models/api/users/users-interface';
import {CompanyEmployeesService} from '../../../../_services/companies/company-employees.service';
import {ProjectsInterface} from '../../../../_models/api/projects/projects-interface';
import {ProjectsService} from '../../../../_services/projects/projects.service';
import {UserProjectsService} from '../../../../_services/projects/user-projects.service';
import {UserProjectsInterface} from '../../../../_models/api/projects/user-projects-interface';
import {CompanyEmployeesInterface} from '../../../../_models/api/companies/company-employees-interface';
import {CompanyInterface} from '../../../../_models/api/companies/company-interface';
import {CompanyService} from '../../../../_services/companies/company.service';
import {CountersInterface} from '../../../../_models/api/counters-interface';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {DownloadReportComponent} from '../../components/download-report/download-report.component';
import {ShareFriendsComponent} from '../../../../components/share-friends/share-friends.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent extends DownloadReportComponent implements OnInit {
  url = environment.url;
  projectTypes = ProjectTypes;
  userProjects: UserProjectsInterface[] = [];
  projectsInterface: ProjectsInterface[] = [];
  companyEmployee: CompanyEmployeesInterface;
  companyInterface: CompanyInterface;
  userInterface: UsersInterface;
  firstName: string;
  userSubscription: string;
  totalUserTons = 0;
  totalUserTrees = 0;
  totalUserKw = 0;
  totalUserAcres = 0;
  co2Certified = 0;
  co2NotCertified = 0;
  imgSubscription = '';
  companyRoles = [];
  nextCourt = 0;
  nextFlight = 0;
  countersInterface: CountersInterface;
  totalTons = 0;
  totalKg = 0;
  houseHolds = 0;
  remainder = 0;
  remainderFlights = 0;
  totalData = 0;
  item = 0;
  totalKwH = 0;
  totalAcres = 0;
  totalHectares = 0;
  totalM2 = 0;
  totalTrees = 0;
  tonsCertified = 0;
  kgCertified = 0;
  tonsNotCertified = 0;
  kgNotCertified = 0;
  link = '';

  lang: string = !!localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  selectedLang: Language;
  region: string = !!localStorage.getItem('region') ? localStorage.getItem('region') : 'all';
  selectedRegion: Region;
  currency: string = !!localStorage.getItem('currency') ? localStorage.getItem('currency') : 'eur';
  selectedCurrency: Currency;

  constructor(
    public route: ActivatedRoute,
    private userProjectsService: UserProjectsService,
    private usersService: UsersService,
    private companyEmployeesService: CompanyEmployeesService,
    private projectsService: ProjectsService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.verifyShopify();
    this.showCustomAlert(this.route, 'share.inviteAccepted', 'share.dashboard');
    this.loadUser().then();
    this.getLocale();
  }

  openLocaleModal(): void {
    this.openLocale(
      this.translate.instant('locale.title'),
      'large',
      this.translate.instant('locale.language'),
      '',
      true,
      (result) => this.setLocale(result),
      'Yes'
    );
  }

  getLocale(): void {
    this.selectedLang = Language[this.lang];
    this.selectedRegion = Region[this.region];
    this.selectedCurrency = Currency[this.currency];
  }

  setLocale(data): void {
    localStorage.setItem('lang', data.lang);
    localStorage.setItem('region', data.region);
    localStorage.setItem('currency', data.currency);
    location.reload();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.projectsInterface.forEach(project => {
        project.country.name = project.country.name_it;
        project.type.name = project.type.name_it;
        project.projectData.overview = project.projectData.overview_it;
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
      const userId = localStorage.getItem(StorageName.id);
      this.ngxService.start('projects');
      const response: Response<ProjectsInterface[]> = await this.userProjectsService.getUserProjects(userId);
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

  loadCompanyValues = async () => {
    try {
      const userId = localStorage.getItem(StorageName.id);
      this.ngxService.start('projects');
      const response: Response<any> = await this.companyEmployeesService.getCompanyValues(userId);
      if (response?.success) {
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('projects');
  }

  isItalian(): boolean {
    return localStorage.getItem('lang') == 'it';
  }

  companyOwner = async () => {
    const companyId = localStorage.getItem(StorageName.companyId);
    const companyResponse: Response<CompanyInterface> = await this.companyService.getCompanyById(companyId);
    try {
      if (companyResponse?.success) {
        this.companyInterface = companyResponse.data;
        this.firstName = this.companyInterface.name;
        localStorage.setItem(StorageName.companyId, this.companyInterface.id);
      } else {
        this.showErrorResponse(companyResponse);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.userSubscription = this.userInterface.companyEmployee?.subscription?.subscriptionType.group?.name;
    this.imgSubscription = this.userInterface.companyEmployee?.subscription?.subscriptionType.group?.slug;
  }

  loadUser = async () => {
    this.ngxService.start('users');
    try {
      const userId = localStorage.getItem(StorageName.id);
      const response: Response<UsersInterface> = await this.usersService.getUserById(userId);
      if (response?.success) {
        this.userInterface = response.data;
        localStorage.setItem(StorageName.pilioLastAccess, this.userInterface.pilioLastAccess?.toString());
        this.loadProjects().then();
        this.loadCompanyValues().then();
        if (this.canSeeCompanyData()) {
          await this.companyOwner();
        } else {
          this.firstName = this.userInterface.firstname;
          this.userSubscription = this.userInterface.companyEmployee?.subscriptionType?.name;
          this.imgSubscription = this.userInterface.companyEmployee?.subscriptionType?.slug;
        }
        await this.getCounters();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.logout(RoutingTypes.HOME_PUBLIC).then();
      // this.showErrorResponse(e);
    }
    this.ngxService.stop('users');
  }

  openProject = async (id: string) => {
    await this.router.navigate(['admin/projects', id, 'about']);
  }

  getCounters = async () => {
    this.ngxService.start('counters');
    try {
      let response: Response<CountersInterface>;

      if (this.canSeeCompanyData()) {
        const companyId = localStorage.getItem(StorageName.companyId);
        response = await this.companyService.getCompanyCounters(companyId);
      } else {
        const userId = localStorage.getItem(StorageName.id);
        response = await this.usersService.getUserCounters(userId);
      }
      if (response?.success) {
        this.countersInterface = response.data;
        this.totalTrees = this.countersInterface.restoration.unit;
        this.totalKwH = this.roundNumber(this.countersInterface.renewable_energy.unit);
        this.totalHectares = this.roundNumber(this.countersInterface.preservation.unit, 5);
        this.totalAcres = this.roundNumber(this.totalAcres / 0.40486, 5);
        this.totalM2 = this.roundNumber(this.totalHectares * 10000)
        this.kgCertified = this.roundNumber((
          this.countersInterface.restoration.certified +
          this.countersInterface.preservation.certified +
          this.countersInterface.renewable_energy.certified +
          this.countersInterface.tonnes.certified
        ));
        this.tonsCertified = this.roundNumber(this.kgCertified / 1000);
        this.kgNotCertified = this.roundNumber((
          this.countersInterface.restoration.notCertified +
          this.countersInterface.preservation.notCertified +
          this.countersInterface.renewable_energy.notCertified +
          this.countersInterface.tonnes.notCertified
        ));
        this.tonsNotCertified = this.roundNumber(this.kgNotCertified / 1000)
        this.totalKg = this.roundNumber(this.kgCertified + this.kgNotCertified);
        this.totalTons = this.roundNumber(this.tonsCertified + this.tonsNotCertified);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('counters');

  }

  inviteAFriend(): void {
    //  this.router.navigate(['welcomeOnBoard/share']);
    const dialog = this.dialog.open(ShareFriendsComponent, {panelClass: 'noPadding'});
  }

  verifyShopify = () => {
    const hmac = this.route.snapshot.queryParams.hmac;
    const shop = this.route.snapshot.queryParams.shop;
  }

}

enum Language {
  "en" = 'en',
  "it" = 'it'
  // "jp" = 'jp'
}

enum Region {
  "all" = 'Global',
  "eu" = 'Europe',
  "mena" = "Middle East",
  "na" = "North America",
  "sa" = "South America",
  "asia" = "Asia Pacific"
}

enum Currency {
  "($) USD" = 'usd',
  "(€) EUR" = 'eur',
  usd = "($) USD",
  eur = "(€) EUR"
}
