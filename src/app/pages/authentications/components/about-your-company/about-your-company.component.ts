import {ChangeDetectorRef,Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {countries} from '../../../../components/store/conutry-data-store';
import { Countries } from '../../../../components/store/models/country.model';

@Component({
  selector: 'app-about-your-company',
  templateUrl: './about-your-company.component.html',
  styleUrls: ['./about-your-company.component.scss']
})
export class AboutYourCompanyComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() appearance?: string = 'fill';
  @Output() policies = new EventEmitter<'none' | 'italian'>();
  public countries: any = countries;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}
  
  countrySelected(value: Countries) {
    this.form.controls['country'].setValue(value.name);
    this.cdRef.detectChanges();
    this.policies.emit((value.code3 == "ITA") ? 'italian' : 'none');
  }

  get companyName(): any {
    return this.form.get('companyName');
  }

  get country(): any {
    return this.form.get('country');
  }

  get city(): any {
    return this.form.get('city');
  }

  get apartment(): any {
    return this.form.get('apartment');
  }

  get street(): any {
    return this.form.get('street');
  }

  get zipCode(): any {
    return this.form.get('zipCode');
  }

  get vatNumber(): any {
    return this.form.get('vatNumber');
  }

  get pec(): any {
    return this.form.get('pec');
  }
}
