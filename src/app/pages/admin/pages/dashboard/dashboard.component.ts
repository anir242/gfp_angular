import {Component, OnInit} from '@angular/core';
import {StorageName} from '../../../../_models/components/storage-name';
import {UsersService} from '../../../../_services/users/users.service';
import {Response} from '../../../../_models/api/response';
import {UsersInterface} from '../../../../_models/api/users/users-interface';
import {CompanyEmployeesService} from '../../../../_services/companies/company-employees.service';
import { ProjectsInterface } from '../../../../_models/api/projects/projects-interface';
import { TransactionInterface } from '../../../../_models/api/transaction-interface';
import {ProjectsService} from '../../../../_services/projects/projects.service';
import {UserProjectsService} from '../../../../_services/projects/user-projects.service';
import {UserProjectsInterface} from '../../../../_models/api/projects/user-projects-interface';
import {CompanyEmployeesInterface} from '../../../../_models/api/companies/company-employees-interface';
import {CompanyInterface} from '../../../../_models/api/companies/company-interface';
import { CompanyService } from '../../../../_services/companies/company.service';
import {CountersInterface} from '../../../../_models/api/counters-interface';
import {ProjectTypes} from '../../../../_models/components/project-types';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {DownloadReportComponent} from '../../components/download-report/download-report.component';
import {ShareFriendsComponent} from '../../../../components/share-friends/share-friends.component';
import { RoutingTypes } from '../../../../_models/components/routing-types';
import { curveBasis } from 'd3-shape';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends DownloadReportComponent implements OnInit {
  url = environment.url;
  projectTypes = ProjectTypes;
  userProjects: UserProjectsInterface[] = [];
  projectsInterface: ProjectsInterface[] = [];
  activeProjects: ProjectsInterface[] = [];
  transactionsInterface: TransactionInterface[] = [];
  companyEmployee: CompanyEmployeesInterface;
  companyInterface: CompanyInterface;
  userInterface: UsersInterface;
  firstName: string;
  userSubscription: string;
  totalUserTons = 0;
  totalUserTrees = 0;
  totalUserKw = 0;
  totalUserAcres = 0;
  totalHectares = 0;
  co2Certified = 0;
  co2NotCertified = 0;
  imgSubscription = '';
  companyRoles = [];
  nextCourt = 0;
  nextFlight = 0;
  countersInterface: CountersInterface;
  countersMonths: CountersInterface[];
  totalTons = 0;
  houseHolds = 0;
  remainder = 0;
  remainderFlights = 0;
  totalData = 0;
  item = 0;
  totalKwH = 0;
  totalAcres = 0;
  totalM2 = 0;
  totalTrees = 0;
  tonsCertified = 0;
  tonsNotCertified = 0;
  link = '';
  curve = curveBasis;
  goalsImages = [];
  goalImagePaths: string[] = [];
  daysAsMember = 0;
  projectsBacked = 0;
  levelsCompleted = 0;

  trees: number;
  acres: number;
  kwh: number;
  results: any[];
  monthsTrees: any[];
  monthsM2: any[];
  monthsKwh: any[];
  monthsCo2: any[];
  colorScheme: any = {
    domain: ['#C3E8C1', '#B5E7EA', '#F4B68C']
  };
  co2ColorScheme: any = {
    domain: ['#636363']
  };
  restorationColorScheme: any = {
    domain: ['#C3E8C1']
  };
  preservationColorScheme: any = {
    domain: ['#B5E7EA']
  };
  renewableColorScheme: any = {
    domain: ['#F4B68C']
  };
  height: number;
  width: number;

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
    //this.setData();
    //this.verifyShopify();
    //this.showCustomAlert(this.route, 'share.inviteAccepted', 'share.dashboard');
    this.loadUser().then();
  }

  getDaysAsMember(): void {
    const now: Date = new Date();
    this.daysAsMember = Math.round((now.valueOf() - Date.parse(this.userInterface.createdAt)) / 1000 / 60 / 60 / 24);
  }

  setMonths(): void {
    let monthsTrees: any[] = [];
    let monthsM2: any[] = [];
    let monthsKwh: any[] = [];

    const now = new Date();
    const start: Date = new Date(Date.parse(this.userInterface.createdAt));
    let index: Date = new Date(start.getFullYear(), start.getMonth(), 1);
    let currentYear = index.getFullYear();
    let currentMonth = index.getMonth();

    const monthlyImpact = this.loadMonthlyImpact();

    while (index < now) {
      const month = {
        "name": index,
        "value": (currentMonth + 1) * (currentMonth + 1) 
      };
      monthsTrees.push(month);
      monthsM2.push(month);
      monthsKwh.push(month);

      currentMonth += 1;
      if (currentMonth >= 12) {
        currentYear += 1;
        currentMonth = 0;
      }
      index = new Date(currentYear, currentMonth, 1);
    }

    this.monthsTrees = [
      {
        "name": "Trees planted",
        "series": monthsTrees
      }
    ];
    this.monthsM2 = [
      {
        "name": "Area protected",
        "series": monthsM2
      }
    ];
    this.monthsKwh = [
      {
        "name": "Energy produced",
        "series": monthsKwh
      }
    ];
  }

  sumCo2(counters: CountersInterface): number {
    return (
      counters.restoration.certified +
      counters.restoration.notCertified +
      counters.preservation.certified +
      counters.preservation.notCertified +
      counters.renewable_energy.certified +
      counters.renewable_energy.notCertified
    );
  }

  getMonthlyImpact(): void {
    try {
      let monthsTrees: any[] = [];
      let monthsM2: any[] = [];
      let monthsKwh: any[] = [];
      let monthsCo2: any[] = [];
      this.countersMonths.forEach(counters => {
        const countersDate = new Date(Date.parse(counters.date));
        monthsTrees.push({
          "name": countersDate,
          "value": counters.restoration.unit
        });
        monthsM2.push({
          "name": countersDate,
          "value": counters.preservation.unit * 10000
        });
        monthsKwh.push({
          "name": countersDate,
          "value": counters.renewable_energy.unit
        });
        monthsCo2.push({
          "name": countersDate,
          "value": this.sumCo2(counters)
        });
      });
      this.monthsTrees = [
        {
          "name": "Trees planted",
          "series": monthsTrees
        }
      ];
      this.monthsM2 = [
        {
          "name": "Area protected",
          "series": monthsM2
        }
      ];
      this.monthsKwh = [
        {
          "name": "Energy produced",
          "series": monthsKwh
        }
      ];
      this.monthsCo2 = [
        {
          "name": "CO2 Offset",
          "series": monthsCo2
        }
      ];
    } catch (e) {
    }
  }

  loadMonthlyImpact = async() => {
    try {
      const userId = localStorage.getItem(StorageName.id);
      this.ngxService.start('monthly');
      const response: Response<CountersInterface[]> = await this.usersService.getUserCountersMonthly(userId);
      if (response?.success) {
        this.countersMonths = response.data;
        this.getMonthlyImpact();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('monthly');
  }

  getLevels(): void {
    let projectsBacked = 0;
    this.projectsInterface.forEach(project => {
      if (project.isActive) {
        this.activeProjects.push(project);
        projectsBacked += 1;
      }
    });
    this.projectsBacked = projectsBacked;
  }

  getProjectGoals() {
    this.activeProjects.forEach(project => {
      this.createImagesArray(project.projectData.goals, this.goalsImages);
    });
    this.goalsImages = this.goalsImages.sort((a, b) => a.position - b.position);
  }

  createImagesArray(initialData?: any, finalData?: any): void {
    if (initialData) {
      initialData.forEach(item => {
        const image = {path: item.image.url, position: item.position};
        if (this.goalImagePaths.indexOf(item.image.url) < 0) {
          finalData.push(image);
          this.goalImagePaths.push(item.image.url);
        }
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
        this.getLevels();
        //this.setMonths();
        this.getProjectGoals();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('projects');
  }

  loadTransactions = async () => {
    try {
      const userId = localStorage.getItem(StorageName.id);
      this.ngxService.start('transactions');
      const response: Response<TransactionInterface[]> = await this.usersService.getUserTransactions(userId);
      if (response?.success) {
        this.transactionsInterface = response.data;
        this.getLevels();
        await this.loadMonthlyImpact();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('transactions');
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
        this.getDaysAsMember();
        this.loadProjects().then();
        this.loadCompanyValues().then();
        this.loadTransactions().then();
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
        this.totalAcres = this.roundNumber(this.totalHectares/0.40486, 5);
        this.totalM2 = this.roundNumber(this.totalHectares * 10000)
        this.tonsCertified = this.roundNumber((
          this.countersInterface.restoration.certified +
          this.countersInterface.preservation.certified +
          this.countersInterface.renewable_energy.certified +
          this.countersInterface.tonnes.certified
        ) / 1000);
        this.tonsNotCertified = this.roundNumber((
          this.countersInterface.restoration.notCertified +
          this.countersInterface.preservation.notCertified +
          this.countersInterface.renewable_energy.notCertified +
          this.countersInterface.tonnes.notCertified
        ) / 1000);
        this.totalTons = this.roundNumber(this.tonsCertified + this.tonsNotCertified);
        this.loadChart();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('counters');

  }

  loadChart = () => {
    const treeTons = this.roundNumber(
      (this.countersInterface.restoration.certified + this.countersInterface.restoration.notCertified) / 1000);
    const acresTons = this.roundNumber(
      (this.countersInterface.preservation.certified + this.countersInterface.preservation.notCertified) / 1000);
    const kwhTons = this.roundNumber(
      (this.countersInterface.renewable_energy.certified + this.countersInterface.renewable_energy.notCertified) / 1000
    );
    this.trees = this.countersInterface.restoration.unit;
    this.acres = this.countersInterface.preservation.unit;
    this.kwh = this.countersInterface.renewable_energy.unit;
    const total = treeTons + acresTons + kwhTons;
    const restoration = this.roundNumber(treeTons / total * 100);
    const preservation = this.roundNumber(acresTons / total * 100);
    const renewable = this.roundNumber(kwhTons / total * 100);
    this.results = [
      {
        name: this.translate.instant('legend.restoration', { value: restoration }),
        value: restoration,
      },
      {
        name: this.translate.instant('legend.preservation', { value: preservation }),
        value: preservation,
      },
      {
        name: this.translate.instant('legend.renewable', { value: renewable }),
        value: renewable,
      }
    ];
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
