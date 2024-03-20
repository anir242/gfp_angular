import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CompanyEmployeesInterface} from '../../../../_models/api/companies/company-employees-interface';
import {MatTableDataSource} from '@angular/material/table';
import {Response} from '../../../../_models/api/response';
import {StorageName} from '../../../../_models/components/storage-name';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';
import {MatChip} from '@angular/material/chips';
import {SubscriptionInfoComponent} from '../../components/subscription-info/subscription-info.component';
import {CompanyService} from '../../../../_services/companies/company.service';
import {SubscriptionTypes} from '../../../../_models/components/subscription-types';
import {ClimatePioneerTypes} from '../../../../_models/components/climate-pioneer-types';
import {SubscriptionsInterface} from '../../../../_models/api/subscriptions/subscriptions-interface';
import {UsersService} from '../../../../_services/users/users.service';
import {ShareFriendsComponent} from '../../../../components/share-friends/share-friends.component';
import {InvitationsService} from '../../../../_services/invitations/invitations.service';
import {InvitationsInterface} from '../../../../_models/api/invitations/invitations-interface';
import {InviteEmployeeComponent} from '../../../../components/invite-employee/invite-employee.component';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})

export class ManageEmployeesComponent extends SubscriptionInfoComponent implements OnInit {
  columnsToDisplay: string[] = ['checkbox', 'createdAt', 'user.firstname', 'user.lastname', 'user.email', 'action'];
  options = ['frequentFlyer', 'globeTrotter', 'ecoFriendly'];
  itemsNumber = 0;
  companyEmployees: CompanyEmployeesInterface[];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CompanyEmployeesInterface>(true, []);
  subscriptionTypes = SubscriptionTypes;
  paginatorOffset = 0;
  paginatorLimit = 20;
  subscriptionId: string;
  image: string;
  subscription: SubscriptionsInterface;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(
    private usersService: UsersService,
    private companyService: CompanyService,
    private invitationsService: InvitationsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptionId = localStorage.getItem(StorageName.subscriptionId);
    this.loadSubscription().then();
  }

  loadSubscription = async () => {
    if (this.canSeeCompanyData()) {
      await this.getSubscription();
    } else {
      await this.getUserSubscriptionById();
    }
  }

  getDataSource = async () => {
    try {
      const response: Response<CompanyEmployeesInterface[]> = await this.subscriptionsService.findEmployees(this.subscriptionId);
      if (response?.success) {
        this.companyEmployees = response.data;
        this.itemsNumber = response.total;
        this.paginatorLimit = this.itemsNumber;
        this.dataSource = new MatTableDataSource(this.companyEmployees);
        return this.dataSource;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  deleteUser = async (): Promise<void> => {
    await this.showAlert({
      title: this.translate.instant('manageEmployees.warning'),
      text: this.translate.instant('manageEmployees.deleteUser'),
      type: 'title-and-text'
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  toggleSelection(c: MatChip): void {
    c.toggleSelected();
  }

  getSubscription = async () => {
    try {
      const response: Response<any> =
        await this.companyService.getCompanySubscriptionsById(localStorage.getItem(StorageName.companyId), this.subscriptionId);
      if (response?.success) {
        this.subscription = response.data.subscription;
        if (this.subscription.subscriptionType.group.slug === this.subscriptionTypes.climateLeader) {
          this.image = this.subscription.subscriptionType.group.images.url;
        } else if (ClimatePioneerTypes.manual === this.subscription.subscriptionType.slug) {
          this.image = this.subscription.subscriptionType.group.images.url;
        } else {
          this.image = this.subscription.subscriptionType.group.images.url;
        }

        if (this.subscription.subscriptionType.group.slug === this.subscriptionTypes.climateLeader) {
          this.columnsToDisplay = ['checkbox', 'createdAt', 'user.firstname', 'user.lastname', 'user.email', 'subscriptionType.name', 'status', 'action'];
          this.getDataSource().then();
        }
        if (this.subscription.subscriptionType.group.slug === this.subscriptionTypes.climatePioneer) {
          this.columnsToDisplay = ['checkbox', 'createdAt', 'email', 'status'];
          await this.getMyInvites();
        }

      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getUserSubscriptionById = async () => {
    const subscriptionId = this.subscriptionId;
    try {
      const response: Response<any> =
        await this.usersService.getUserSubscriptionsById(localStorage.getItem(StorageName.id), subscriptionId);
      if (response?.success) {
        this.subscription = response.data.subscription;
        if (this.subscription.subscriptionType.group.slug === this.subscriptionTypes.individual) {
          this.image = this.subscription.subscriptionType.image.url;
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getElement(element, column: string): string {
    /*const cols = column.split('.');
    if (element[cols[0]]) {
      return element[cols[0]][cols[1]];
    } else {
      return '';
    }*/
    const cols = column.split('.');
    if (element[cols[0]]) {
      if (cols[0] === 'user' && cols[1] === 'email') {
        return element[cols[0]][cols[1]] ? element[cols[0]][cols[1]] : element?.email;
      }
      return element[cols[0]][cols[1]];
    } else {
      return '';
    }
  }

  inviteEmployee = () => {
    const dialog = this.dialog.open(ShareFriendsComponent, {panelClass: 'noPadding'});
    dialog.afterClosed().subscribe(result => {
      if (result === true){
        this.loadSubscription().then();
      }
    });
  }

  getMyInvites = async () => {
    try {
      const response: Response<InvitationsInterface[]> = await this.invitationsService.getMyInvitations();
      if (response?.success) {
        this.dataSource = new MatTableDataSource(response.data);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  editEmployee(): void {
    const dialogRef = this.dialog.open(InviteEmployeeComponent, {data: this.companyEmployees});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getDataSource().then();
      }
    });
  }
}
