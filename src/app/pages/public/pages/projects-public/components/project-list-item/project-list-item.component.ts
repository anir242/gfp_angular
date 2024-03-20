import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectsInterface} from '../../../../../../_models/api/projects/projects-interface';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {Response} from '../../../../../../_models/api/response';
import {SinglePaymentPacksInterface} from '../../../../../../_models/api/public/single-payment-packs-interface';
import {SinglePaymentPacksService} from '../../../../../../_services/public/single-payment-packs.service';
import {BaseComponent} from '../../../../../_base/base/base.component';
import { UnitTypes } from 'src/app/_models/components/unit-types';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent extends BaseComponent implements OnInit, AfterViewChecked {
  @Input() project: ProjectsInterface;
  @Input() size: 'small'|'big' = 'small'; // big on map project
  openClass: string;
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  collapsed = true;
  @Output() selectProject = new EventEmitter<string>();
  value: string;
  quantity: number;
  unit: string;

  constructor(
    private singlePaymentPacksService: SinglePaymentPacksService
  ) {
    super();
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getPayments().then();
  }

  ngAfterViewChecked(): void {
      this.ngxService.stop();
  }

  openProject = async (id: string) => {
    // await this.router.navigate([RoutingTypes.PROJECTS_PUBLIC, id, 'about']);
    if (this.size === 'small'){
      await this.router.navigate([RoutingTypes.PROJECTS_PUBLIC, id]);
    }else{
      this.selectProject.emit(id);
    }
  }

  openProjectPage = async (id: string) => {
    await this.router.navigate([RoutingTypes.PROJECTS_PUBLIC, id]);
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.project.slug);
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
        this.getStartingPayment();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getStartingPayment(): void {
    let quantity;
    let value;
    this.singlePaymentPacksInterface?.singlePayments.forEach((payment) => {
      if (quantity) {
        if (payment.quantity < quantity) {
          quantity = payment.quantity;
        }
      } else {
        quantity = payment.quantity;
      }
      if (value) {
        if (payment.price < value) {
          value = payment.price;
        }
      } else {
        value = payment.price;
      }
    });
    if (value) {
      this.value = (value * 100 / 100).toFixed(2);
    }
    if (quantity) {
      if (this.singlePaymentPacksInterface.unit.slug == UnitTypes.HECTARE && quantity < 1) {
        this.quantity = quantity * 10000;
        this.unit = 'm2';
      } else {
        this.quantity = quantity;
        this.unit = this.translate.instant('projectList.'+this.singlePaymentPacksInterface?.unit.slug+'Unit');
      }
    }
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

  setClass(type: boolean): void {
    if (type) {
      this.openClass = 'opened';
    } else if (!type) {
      this.openClass = 'closed';
    }

  }
}
