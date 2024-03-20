import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditTypes} from '../../_models/components/edit-types';
import {StorageName} from '../../_models/components/storage-name';
import {MatButton} from '@angular/material/button';
import {Response} from '../../_models/api/response';
import { UsersService } from '../../_services/users/users.service';
import { CompanyService } from '../../_services/companies/company.service';
import {CompanyAddressesService} from '../../_services/companies/company-addresses.service';
import Validation from '../validator/input-equals';
import {AlertTypes} from '../../_models/components/alert-types';
import { UserTypes } from 'src/app/_models/components/user-types';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent extends BaseComponent implements OnInit {
  formData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private companyService: CompanyService,
    private companyAddressesService: CompanyAddressesService,
  ) {
    super();
    this.formData = this.data.formData;
  }

  id = localStorage.getItem(StorageName.id);
  obj = new UntypedFormGroup({});
  type = 'text';
  disabled = true;

  ngOnInit(): void {
    this.enableButton();
    this.addControls();
    this.addPasswordValidator();
  }

  enableButton(): void {
    this.obj.statusChanges.subscribe(status => {
      if (status === EditTypes.invalid) {
        this.disabled = true;
      } else if (status === EditTypes.valid) {
        this.disabled = false;
      }
    });
  }

  addPasswordValidator(): void {
    if (this.formData.editType === EditTypes.password) {
      this.obj?.get(EditTypes.cPassword).addValidators(
        Validation.match(this.password)
      );
      this.obj?.get(EditTypes.password).addValidators(
        Validation.match(this.cPassword)
      );
    }
  }

  addControls(): void {
    switch (this.formData?.editType) {
      case EditTypes.user.value: {
        this.obj.addControl(EditTypes.user.firstname, new UntypedFormControl(this.formData.firstname, [
          Validators.required,
        ]));
        this.obj.addControl(EditTypes.user.lastname, new UntypedFormControl(this.formData.lastname, [
          Validators.required,
        ]));
        break;
      }
      case EditTypes.type.address:
      case EditTypes.type.billing: {
        this.id = this.formData.companyId;
        this.obj.addControl(EditTypes.companyAddress.city, new UntypedFormControl(this.formData.city, [
          Validators.required,
        ]));
        this.obj.addControl(EditTypes.companyAddress.street, new UntypedFormControl(this.formData.street, [
          Validators.required,
        ]));
        this.obj.addControl(EditTypes.companyAddress.country, new UntypedFormControl(this.formData.country, [
          Validators.required,
        ]));
        this.obj.addControl(EditTypes.companyAddress.apartment, new UntypedFormControl(this.formData.apartment, [
          Validators.required,
        ]));
        this.obj.addControl(EditTypes.companyAddress.zip, new UntypedFormControl(this.formData.zip, [
          Validators.required,
        ]));
        break;
      }
      case EditTypes.email: {
        this.type = EditTypes.email;
        this.obj.addControl(EditTypes.email, new UntypedFormControl(this.formData.email, [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]));
        break;
      }
      case EditTypes.password: {
        this.type = EditTypes.password;
        this.obj.addControl(EditTypes.password, new UntypedFormControl(this.formData.password, [
          Validators.required,
          Validators.minLength(8),
        ]));
        this.obj.addControl(EditTypes.cPassword, new UntypedFormControl(this.formData.cPassword, [
          Validators.required,
          Validators.minLength(8),
        ]));
        break;
      }
      case EditTypes.company.value: {
        this.type = EditTypes.company.value;
        this.obj.addControl(EditTypes.company.name, new UntypedFormControl(this.formData.name, [
          Validators.required
        ]));
        this.obj.addControl(EditTypes.company.vatNumber, new UntypedFormControl(this.formData.vatNumber, [
          Validators.required
        ]));
        this.obj.addControl(EditTypes.company.pec, new UntypedFormControl(this.formData.pec, [
          Validators.required
        ]));
        break;
      }
      case EditTypes.type.payment: {
        break;
      }
      default: {
        break;
      }
    }
  }

  async send(): Promise<void> {
    const userType = this.data.userType;
    if (this.obj.status === 'VALID') {
      switch (this.formData.editType) {
        case EditTypes.user.value:
        case EditTypes.email:
        case EditTypes.password: {
          await this.updatePersonal();
          break;
        }
        case EditTypes.type.address:
        case EditTypes.type.billing: {
          await this.updateAddress(userType || '');
          break;
        }
        case EditTypes.company.value: {
          await this.updateCompany();
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  async updatePersonal(): Promise<void> {
    try {
      const response: Response<any> = await this.userService.updateUserById(this.id, this.obj.value);
      if (response?.success) {
        this.successMessage();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  async updateCompany(): Promise<void> {
    try {
      this.id = this.formData.companyId;
      const response: Response<any> = await this.companyService.updateCompanyById(this.formData.companyId, this.obj.value);
      if (response?.success) {
        this.successMessage();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  async updateAddress(type: string): Promise<void> {
    let response: Response<any>;
    const data = this.obj.value;
    data.companyId = this.formData.companyId;
    data.type = this.formData.editType;
    try {
      if (type === UserTypes.individual) {
        response = await this.userService.updateUserBillingAddress(this.formData.id, data);
      } else {
        response = await this.companyAddressesService.updateAddressById(this.formData.id, data);
      }
      if (response?.success) {
        this.successMessage();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  successMessage(): void{
    this.showSuccess(
      this.translate.instant('modalEdit.alertBody'),
      this.translate.instant('modalEdit.alertTitle'),
    );
  }
  get firstName(): any {
    return this.obj?.get(EditTypes.user.firstname);
  }

  get lastName(): any {
    return this.obj?.get(EditTypes.user.lastname);
  }

  get email(): any {
    return this.obj?.get(EditTypes.email);
  }

  get password(): any {
    return this.obj?.get(EditTypes.password);
  }

  get cPassword(): any {
    return this.obj?.get(EditTypes.cPassword);
  }

}
