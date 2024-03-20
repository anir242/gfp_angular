import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormGroup, Validators} from '@angular/forms';
import { countries } from '../store/conutry-data-store';
import { Countries } from '../store/models/country.model';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.scss']
})
export class BillingAddressComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() showSdi: boolean;
  @Output() policies = new EventEmitter<'none' | 'italian'>();
  @Input() appearance?: string = 'fill';

  public countries: any = countries;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  setSameAsCompany(): void {
    this.sameAsCompany.valueChanges.subscribe(val => {
      if (val) {
        this.country.clearValidators();
        this.country.disable();
        this.country.reset();
        this.sdi.clearValidators();
        this.sdi.disable();
        this.sdi.reset();
        this.city.clearValidators();
        this.city.disable();
        this.city.reset();
        this.streetHouse.clearValidators();
        this.streetHouse.disable();
        this.streetHouse.reset();
        this.apartment.clearValidators();
        this.apartment.disable();
        this.apartment.reset();
        this.zip.clearValidators();
        this.zip.disable();
        this.zip.reset();
      } else {
        this.country.setValidators([Validators.required]);
        if (this.showSdi) {
          this.sdi.setValidators([Validators.required]);
        }
        this.city.setValidators([Validators.required]);
        this.streetHouse.setValidators([Validators.required]);
        this.apartment.setValidators([Validators.required]);
        this.zip.setValidators([Validators.required]);
        this.country.enable();
        this.sdi.enable();
        this.city.enable();
        this.streetHouse.enable();
        this.apartment.enable();
        this.zip.enable();
      }
    });
  }

  countrySelected(value: Countries) {
    this.form.controls['country'].setValue(value.name);
    this.cdRef.detectChanges();
    this.policies.emit((value.code3 == "ITA") ? 'italian' : 'none');
  }

  get country(): any {
    return this.form.get('country');
  }

  /*set country(value) {
    
  }*/

  get sdi(): any {
    return this.form.get('sdi');
  }
  get city(): any {
    return this.form.get('city');
  }
  get streetHouse(): any {
    return this.form.get('streetHouse');
  }
  get apartment(): any {
    return this.form.get('apartment');
  }
  get zip(): any {
    return this.form.get('zip');
  }
  get sameAsCompany(): any {
    return this.form.get('sameAsCompany');
  }
}
