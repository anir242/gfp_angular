import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  ClientType = ClientType;
  activeLang: boolean;
  // const  = document.getElementById('en');
  // it = document.getElementById('en');
  currentLang = localStorage.getItem('lang');

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const en = document.getElementById('en');
    const it = document.getElementById('it');

    if(this.currentLang=='en'){
      en.style.background="#F2BF00";
      en.style.color="#333333";

      it.style.background='white';
      it.style.color="#8A8A8A"
    }
    else{
      en.style.background='white';
      en.style.color="#8A8A8A";

      it.style.background='#F2BF00';
      it.style.color="#333333";
    }
  }

  saveAs(type: ClientType) {
    localStorage.setItem('clientType', type.toString());
    this.router.navigate(['']);
  }

  setLang(lang): void {
    if (this.currentLang != lang) {
      localStorage.setItem('lang', lang);
      location.reload();
    }
  }

}

enum ClientType {
  individual = 1,
  business = 2,
}
