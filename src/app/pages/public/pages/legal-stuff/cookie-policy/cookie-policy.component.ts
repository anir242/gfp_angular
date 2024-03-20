import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../../../_services/script.service';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})
export class CookiePolicyComponent implements OnInit {

  constructor(
    private scriptService: ScriptService,
  ) { }

  ngOnInit(): void {
    this.scriptService.load('cookiePolicy').then(data => {
    }).catch(error => console.log(error));
  }

}
