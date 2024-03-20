import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../../../_services/script.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor(
    private scriptService: ScriptService,
  ) { }

  ngOnInit(): void {
    this.scriptService.load('termsConditions').then(data => {
    }).catch(error => console.log(error));
  }

}
