import { Component, NgZone, OnInit } from '@angular/core';
import { BaseComponent } from '../../../_base/base/base.component';
import { UsersService } from '../../../../_services/users/users.service';
import { StorageName } from '../../../../_models/components/storage-name';
import { Response } from '../../../../_models/api/response';
import { UsersInterface } from '../../../../_models/api/users/users-interface';
import { CompanyEmployeesInterface } from '../../../../_models/api/companies/company-employees-interface';
import { CompanyEmployeesService } from '../../../../_services/companies/company-employees.service';
import { CompanyAddressesInterface } from '../../../../_models/api/companies/company-addresses-interface';
import { PaymentMethodInterface } from '../../../../_models/api/payments/payment-method-interface';
import { StripeAppService } from '../../../../_services/payments/stripe-app.service';
import { CompanyAddressesService } from '../../../../_services/companies/company-addresses.service';
import { ModalEditComponent } from '../../../../components/modal-edit/modal-edit.component';
import { EditTypes } from '../../../../_models/components/edit-types';
import { UserTypes } from '../../../../_models/components/user-types';
import { ModalPaymentMethodComponent } from 'src/app/components/modal-payment-method/modal-payment-method.component';
import { Observable } from 'rxjs';
import { BillingAddressInterface } from 'src/app/_models/billing-address-interface';


@Component({
  selector: 'app-account-billing',
  templateUrl: './account-billing.component.html',
  styleUrls: ['./account-billing.component.scss']
})
export class AccountBillingComponent extends BaseComponent implements OnInit {
  companyEmployee: CompanyEmployeesInterface;
  user: UsersInterface;
  companyAddressesBilling: CompanyAddressesInterface;
  companyAddressesInfo: CompanyAddressesInterface;
  paymentMethod: PaymentMethodInterface;
  paymentMethods: PaymentMethodInterface[];
  idBilling: string;
  idAddress: string;
  editTypes = EditTypes;
  userTypes = UserTypes;
  policy: any;
  userAddress: CompanyAddressesInterface;
  constructor(
    private usersService: UsersService,
    private companyEmployeesService: CompanyEmployeesService,
    private companyAddressesService: CompanyAddressesService,
    private stripeService: StripeAppService,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUserData().then();
    this.getPaymentMethods().then();
    this.getPaymentMethodsList().then();
    this.getUserAddress().then();
  }
  
  async getCompanyAddresses(companyId: string): Promise<void> {
    const params: any = {
      companyId
    };
    try {
      const response: Response<CompanyAddressesInterface[]> = await this.companyAddressesService.getCompanyAddresses(params);
      if (response?.success) {
        if (response.data?.length > 0) {
          for (const address of response.data) {
            if (address.type === 'billing_address') {
              this.companyAddressesBilling = address;
              this.idBilling = address.id;
            } else {
              this.companyAddressesInfo = address;
              this.idAddress = address.id;
            }
          }
          if (!this.companyAddressesBilling) {
            this.companyAddressesBilling = this.companyAddressesInfo;
          }
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  async getPaymentMethods(): Promise<void> {
    try {
      const response: Response<PaymentMethodInterface[]> = await this.stripeService.paymentMethods();
      if (response?.success) {
        this.paymentMethod = response.data[0];
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  async getUserCompany(): Promise<void> {
    const params: any = {
      userId: localStorage.getItem(StorageName.id)
    };
    try {
      const response: Response<CompanyEmployeesInterface[]> = await this.companyEmployeesService.getCompanyEmployees(params);
      if (response?.success) {
        this.companyEmployee = response.data[0];
        if (this.companyEmployee) {
          localStorage.setItem(StorageName.companyId, this.companyEmployee?.companyId);
          await this.getCompanyAddresses(this.companyEmployee?.companyId);
        }
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      console.error(e);
    }
  }

  async getUserData(): Promise<void> {
    const userId = localStorage.getItem(StorageName.id);
    try {
      const response: Response<UsersInterface> = await this.usersService.getUserById(userId);
      if (response?.success) {
        this.user = response.data;
        localStorage.setItem(StorageName.userType, this.user.type)
        switch (this.user.type) {
          case UserTypes.individual: {
            break;
          }
          case UserTypes.business: {
            this.getUserCompany().then();
            break;
          }
        }
        await this.getPaymentMethods();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  deleteUser = () => {
    this.usersService.deleteUser(localStorage.getItem('id')).then();
    this.logout().then();
  }
  confirmElimination = async () => {
    this.openModal(
      this.translate.instant('deleteAccount.title'),
      'small',
      this.translate.instant('deleteAccount.text'),
      '',
      true,
      () => this.deleteUser(),
      'Yes'
    );
  }

  confirmEliminationPaymentMethod = async (paymentMethod: PaymentMethodInterface) => {
    this.openModal(
      this.translate.instant('paymentMethod.delete.title'),
      'small',
      this.translate.instant('paymentMethod.delete.text') + "" + paymentMethod.card.last4,
      '',
      true,
      () => this.deletePaymentMethod(paymentMethod),
      'Yes',
      'No'
    );
  }

  async getPaymentMethodsList() {
    const response: Response<PaymentMethodInterface[]> = await this.stripeService.paymentMethods();
    this.zone.run(() => {
      this.paymentMethods = response.data;
    })
    //console.log(this.paymentMethods)
  }

  async deletePaymentMethod(paymentMethod) {
    if (this.paymentMethods.length <= 1) return;
    await this.stripeService.deletePaymentMethod(paymentMethod.id);
    this.getPaymentMethodsList().then();
  }

  openDialogPaymentMethod(paymentMethod) {
    const dialogRef = this.dialog.open(ModalPaymentMethodComponent, { data: {} });
    dialogRef.afterClosed().subscribe(result => {
      this.getPaymentMethodsList().then();
    });
  }

  openDialog(typo: string): void {
    let formData;
    switch (typo) {
      case EditTypes.user.value: {
        formData = {
          editType: typo,
          firstname: this.user?.firstname,
          lastname: this.user?.lastname,
          email: this.user?.email
        };
        break;
      }
      case EditTypes.type.address:
      case EditTypes.type.billing: {
        if (this.companyEmployee?.companyId) {
          formData = {
            editType: typo,
            companyId: this.companyEmployee.companyId
          };
          if (EditTypes.type.address === typo) {
            formData.id = this.idAddress;
            formData.city = this.companyAddressesInfo.city;
            formData.street = this.companyAddressesInfo.street;
            formData.country = this.companyAddressesInfo.country;
            formData.apartment = this.companyAddressesInfo.apartment;
            formData.zip = this.companyAddressesInfo.zip;
          } else {
            formData.id = this.idBilling;
            formData.city = this.companyAddressesBilling.city;
            formData.street = this.companyAddressesBilling.street;
            formData.country = this.companyAddressesBilling.country;
            formData.apartment = this.companyAddressesBilling.apartment;
            formData.zip = this.companyAddressesBilling.zip;
          }
        } else if (this.user.type === this.userTypes.individual) {
          formData = {
            editType: typo,
          };
          formData.id = this.idAddress;
          formData.city = this.userAddress.city;
          formData.street = this.userAddress.street;
          formData.country = this.userAddress.country;
          formData.apartment = this.userAddress.apartment;
          formData.zip = this.userAddress.zip;
        }
        break;
      }
      case EditTypes.email: {
        formData = {
          editType: typo,
          email: this.user.email
        };
        break;
      }
      case EditTypes.password: {
        formData = {
          editType: typo,
          password: ''
        };
        break;
      }
      case EditTypes.company.value: {
        formData = {
          editType: typo,
          companyId: this.companyEmployee.companyId,
          name: this.companyEmployee.company.name,
          vatNumber: this.companyEmployee.company.vatNumber,
          pec: this.companyEmployee.company.pec
        };
        break;
      }
      case EditTypes.type.payment: {
        const dialogRef = this.dialog.open(ModalPaymentMethodComponent, { data: {} });
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            this.getUserData().then();
            this.getUserCompany().then();
          }
          this.getPaymentMethodsList().then();
        });
        return;
      }
      default: {
        break;
      }
    }
    const dialogRef = this.dialog.open(ModalEditComponent, { data: {formData, userType: this.user.type}, disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getUserData().then();
        this.getUserCompany().then();
        this.getUserAddress().then();
      }
    });
  }

  async getUserAddress() {
    const response: any = await this.usersService.getUserBillingAddress();
    this.userAddress = response.data;
  }
}
