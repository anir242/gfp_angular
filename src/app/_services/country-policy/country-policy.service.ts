import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryPolicyService {

  countryChangeSubject: Subject<string> = new Subject<string>()

  constructor() { }
  
  updateCountryPolicy(value: string){
    this.countryChangeSubject.next(value);
  }
}
