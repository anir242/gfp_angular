import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseComponent} from '../../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import {LegalStuff} from '../../../../_models/components/legal-stuff';
@Component({
  selector: 'app-legal-stuff',
  templateUrl: './legal-stuff.component.html',
  styleUrls: ['./legal-stuff.component.scss']
})
export class LegalStuffComponent extends BaseComponent implements OnInit {
  text: any;
  title: string;
  type: string;
  location: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    super();
  }

  ngOnInit(): void {
    this.getType();
    this.text = this.getTextFromTxt();
  }
  getType(): void{
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      switch (this.type){
        case LegalStuff.PRIVACY_POLICY: {
          this.location = 'assets/files/privacy-policy.txt';
          this.title = this.translate.instant('privacyPolicy.privacyPolicy');
          break;
        }
        case LegalStuff.TERMS_AND_CONDITIONS: {
          this.location = 'assets/files/terms-conditions.txt';
          this.title = this.translate.instant('termsCondition');
          break;
        }
      }
    });
  }
  getTextFromTxt = async () => {
    try {
      this.http.get(this.location, {responseType: 'text'}).subscribe(data => {
        this.text = data;
      });
    } catch (e) {
    }
  }
}
