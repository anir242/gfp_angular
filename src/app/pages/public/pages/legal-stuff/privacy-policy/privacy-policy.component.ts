import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../../../_services/script.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private scriptService: ScriptService) {}

  ngOnInit(): void {
    this.scriptService
      .load('privacyPolicy')
      .then((data) => {})
      .catch((error) => console.log(error));
  }
}
