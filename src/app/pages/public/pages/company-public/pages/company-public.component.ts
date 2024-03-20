import { Component, OnInit } from '@angular/core';
import { StorageName } from '../../../../../_models/components/storage-name';
import { UsersService } from '../../../../../_services/users/users.service';
import { Response } from '../../../../../_models/api/response';
import { UsersInterface } from '../../../../../_models/api/users/users-interface';
import { CompanyEmployeesService } from '../../../../../_services/companies/company-employees.service';
import { ProjectsInterface } from '../../../../../_models/api/projects/projects-interface';
import { ProjectsService } from '../../../../../_services/projects/projects.service';
import { UserProjectsService } from '../../../../../_services/projects/user-projects.service';
import { UserProjectsInterface } from '../../../../../_models/api/projects/user-projects-interface';
import { CompanyEmployeesInterface } from '../../../../../_models/api/companies/company-employees-interface';
import { CompanyInterface } from '../../../../../_models/api/companies/company-interface';
import { CompanyService } from '../../../../../_services/companies/company.service';
import { CountersInterface } from '../../../../../_models/api/counters-interface';
import { ProjectTypes } from '../../../../../_models/components/project-types';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { DownloadReportComponent } from '../../../../admin/components/download-report/download-report.component';
import { ShareFriendsComponent } from '../../../../../components/share-friends/share-friends.component';
import { RoutingTypes } from '../../../../../_models/components/routing-types';

@Component({
  selector: 'app-company-public',
  templateUrl: './company-public.component.html',
  styleUrls: ['./company-public.component.scss']
})
export class CompanyPublicComponent extends DownloadReportComponent implements OnInit {
  url = environment.url;
  projectTypes = ProjectTypes;
  userProjects: UserProjectsInterface[] = [];
  projectsInterface: ProjectsInterface[] = [];
  companyEmployee: CompanyEmployeesInterface;
  companyInterface: CompanyInterface;
  userInterface: UsersInterface;
  companyId: string;
  companyOwnerId: string;
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
  houseHolds = 0;
  remainder = 0;
  remainderFlights = 0;
  totalData = 0;
  item = 0;
  totalKwH = 0;
  totalM2 = 0;
  totalAcres = 0;
  totalTrees = 0;
  tonsCertified = 0;
  tonsNotCertified = 0;
  link = '';


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
    this.route.params.subscribe(async (params) => {
      let slug = "";
      if (this.validUUID(params.id)) {
        const companyResponse: Response<CompanyInterface> = await this.companyService.getCompanyPublicById(params.id);
        slug = companyResponse.data.slug;
        this.router.navigate([`/company/${slug}`]);
      } else {
        slug = params.id;
      }
      const response: Response<CompanyInterface> = await this.companyService.getCompanyPublicIdBySlug(slug);
      if (response.success) {
        this.companyId = response.data.id;
        localStorage.setItem(StorageName.companyId, this.companyId);
        this.loadUser().then();
      }
    });
  }

  validUUID(uuid: string): boolean {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    return regexExp.test(uuid);
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

  loadProjects = async () => {
    try {
      const userId = this.companyOwnerId;
      this.ngxService.start('projects');
      const response: Response<ProjectsInterface[]> = await this.userProjectsService.getUserPublicProjects(userId);
      if (response?.success) {
        this.projectsInterface = response.data;
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
      const userId = this.companyOwnerId;
      this.ngxService.start('projects');
      const response: Response<any> = await this.companyEmployeesService.getCompanyPublicValues(userId);
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
    const companyResponse: Response<CompanyInterface> = await this.companyService.getCompanyPublicById(this.companyId);
    try {
      if (companyResponse?.success) {
        this.companyInterface = companyResponse.data;
        this.firstName = this.companyInterface.name;
        localStorage.setItem(StorageName.companyName, this.firstName);
        const ownerResponse: Response<any> = await this.companyEmployeesService.getCompanyOwner(this.companyId);
        if (ownerResponse?.success) {
          this.companyOwnerId = ownerResponse.data?.userId;
          localStorage.setItem(StorageName.id, this.companyOwnerId);
        }
      } else {
        this.showErrorResponse(companyResponse);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  isItalian(): boolean {
    return localStorage.getItem('lang') == 'it';
  }

  loadUser = async () => {
    this.ngxService.start('users');
    try {
      await this.companyOwner();
      await this.getCounters();
      const response: Response<UsersInterface> = await this.usersService.getCompanyOwnerById(this.companyOwnerId);
      if (response?.success) {
        this.userInterface = response.data;
        this.userSubscription = this.userInterface.companyEmployee?.subscription?.subscriptionType.group?.name;
        this.imgSubscription = this.userInterface.companyEmployee?.subscription?.subscriptionType.group?.slug;
        this.loadProjects().then();
        this.loadCompanyValues().then();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('users');
  }

  openProject = async (id: string) => {
    await this.router.navigate(['projects', id]);
  }

  getCounters = async () => {
    this.ngxService.start('counters');
    try {
      let response: Response<CountersInterface>;
      response = await this.companyService.getCompanyPublicCounters(this.companyId);
      if (response?.success) {
        this.countersInterface = response.data;
        this.totalTrees = this.countersInterface.restoration.unit;
        this.totalKwH = this.roundNumber(this.countersInterface.renewable_energy.unit);
        this.totalAcres = this.roundNumber(this.countersInterface.preservation.unit);
        this.totalM2 = this.roundNumber(this.countersInterface.preservation.unit * 10000)
        this.tonsCertified =
          this.roundNumber((this.countersInterface.restoration.certified + this.countersInterface.preservation.certified +
            this.countersInterface.renewable_energy.certified) / 1000);
        this.tonsNotCertified =
          this.roundNumber((this.countersInterface.restoration.notCertified + this.countersInterface.preservation.notCertified +
            this.countersInterface.renewable_energy.notCertified) / 1000);
        this.totalTons = this.roundNumber(this.tonsCertified + this.tonsNotCertified);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop('counters');

  }

}
