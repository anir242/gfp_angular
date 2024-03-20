import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Subscription } from 'rxjs';
import {ScriptService} from './_services/script.service';
import Userback from '@userback/widget';
import { environment } from 'src/environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'green-future-project';

  constructor(
    public router: Router,
    translate: TranslateService,
    private titleService: Title,
    private gtmService: GoogleTagManagerService,
    private scriptService: ScriptService
  ) {
    let redirect = this.checkRedirect(window.location.href);
    this.setLang(translate);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        redirect = this.checkRedirect(event.url);
        const gtmTag = {
          event: 'page_view',
          pageName: event.url
        };
        this.gtmService.pushTag(gtmTag);
      }
    });
    if (redirect) {
      this.router.navigate(['welcome']);
    }
  }

  checkRedirect(url: string): boolean {
    return !(
      localStorage.getItem('clientType') != null ||
      localStorage.getItem('username') != null ||
      url.indexOf('/company/') >= 0 ||
      url.indexOf('/register') >= 0 ||
      url.indexOf('/resetPassword') >= 0 ||
      url.indexOf('utm_source') >= 0
    )
  }

  setLang(translate:TranslateService): void {
    translate.addLangs(['it', 'en', 'jp']);
    translate.setDefaultLang('en');
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang) {
      translate.use(selectedLang.match(/en|it|jp/) ? selectedLang : 'en');
    }
    else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang && browserLang.match(/en|it|jp/) ? browserLang : 'en');
    }
  }

  ngOnInit() {
    //this.scriptService.load('googleMaps').then(data => {console.log('maps loaded')}).catch(error => console.log('maps', error));
    //this.scriptService.load('bootstrap').then(data => {console.log('bootstrap loaded')}).catch(error => console.log('bootstrap', error));
    if (!environment.production) {
      //Userback('36203|74071|kCOznOBFLge1M86vcXkW7efTv');
    }
  }

  ngOnDestroy() {
  }
}
