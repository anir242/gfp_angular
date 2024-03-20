import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../../../../_base/base/base.component';
import { ProjectsService } from '../../../../../../_services/projects/projects.service';
import {ProjectsInterface} from '../../../../../../_models/api/projects/projects-interface';
import {Response} from '../../../../../../_models/api/response';
import {UntypedFormControl} from '@angular/forms';
import {ProjectTypes} from '../../../../../../_models/components/project-types';
import {SharedDataProjectService} from '../../../../../../_services/projects/shared-data-project.service';
import {StorageName} from '../../../../../../_models/components/storage-name';
import {environment} from '../../../../../../../environments/environment';
import {ShareFriendsComponent} from '../../../../../../components/share-friends/share-friends.component';
import {SinglePaymentPacksInterface} from "../../../../../../_models/api/public/single-payment-packs-interface";
import {SinglePaymentPacksService} from "../../../../../../_services/public/single-payment-packs.service";
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProjectsPartnersInterface } from 'src/app/_models/api/projects/projects-partners-interface';
import { PartnersPublicService } from 'src/app/_services/public/partners.public.service';

@Component({
  selector: 'app-project-live',
  templateUrl: './project-live.component.html',
  styleUrls: ['./project-live.component.scss'],
})
export class ProjectLiveComponent extends BaseComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private sharedDataProjectService: SharedDataProjectService,
    private singlePaymentPacksService: SinglePaymentPacksService,
    private partnersPublicService: PartnersPublicService,
    public router: Router,
  ) {
    super();
  }

  weather: any;
  date: Date = new Date();
  time: string;
  timezone: any;
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  projectTypes = ProjectTypes;
  activeLink = this.translate.instant('about');
  slug: string;
  projectSlug: string;
  project: ProjectsInterface;
  totalUserKw = 0;
  totalTonsOffsetted = 0;
  links: string[];
  kmRomeNewYork = 6883.87;
  tonsCo2Km = 6700;
  percentTrees = 0;
  percentAcres = 0;
  nextCourt = 0;
  flights = 0;
  totalTons = 0;
  houseHolds = 0;
  remainder = 0;
  remainderFlights = 0;
  totalData = 0;
  item = 0;
  url = environment.url;
  popUpCO2 = this.translate.instant('projectDetails.popUpCO2');
  popUpTrees = this.translate.instant('projectDetails.popUpTreesH');
  titleCO2 = this.translate.instant('projectDetails.infoCO2');
  titleTrees = this.translate.instant('projectDetails.infoTrees');
  timeSelected = new UntypedFormControl();
  day: string = 'day';
  night: string = 'night';
  isSmallScreen: boolean;
  videoURL: string;
  photoURL: string;
  orbifyURL: string;
  temperature: number;
  humidity: number;
  wind: number;
  precipitation: number;
  stopped: boolean = true;
  audioLink: string;
  pressData: any;

  ngOnInit(): void {
    this.date = new Date();
    this.setTime();
    this.isSmallScreen= this.breakpointObserver.isMatched('(max-width:991px)');
    this.slug = this.route.snapshot.params.slug;
    this.url = this.url + this.router.url;
    this.sharedDataProjectService.counters = null;
    this.timeSelected.setValue('day');
    this.loadProject().then();
    this.getPayments().then();
    setInterval(() => {this.setTime()}, 1000)
  }

  setTime(): void {
    const d = new Date();
    if (this.timezone) {
      this.time = d.toLocaleString("en-GB", {timeZone: this.timezone.timeZoneId});
    } else {
      const seconds = d.getSeconds();
      const minutes = d.getMinutes();
      const hours = d.getHours();
      this.time = (
        d.toDateString() + " " +
        ("0" + hours).substr(-2) + ":" + 
        ("0" + minutes).substr(-2) + ":" + 
        ("0" + seconds).substr(-2)
      );
    }
  }

  setTimeZone = async () => {
    try {
      const response: any = await this.projectsService.getProjectTimeZone(
        this.project.projectData.latitude,
        this.project.projectData.longitude,
        (this.date.getTime() / 1000)
      );
      this.timezone = response;
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  loadProject = async () => {
    const params = {
      slug: this.slug,
      type: 'press'
    }
    this.ngxService.start();
    try {
      const response: Response<ProjectsInterface> = await this.projectsService.getPublicProjectBySlug(this.slug);
      const pressResponse: Response<ProjectsPartnersInterface[]> = await this.partnersPublicService.getPublicPartnersBySlug(params)
      if (pressResponse?.success) {
        this.pressData = pressResponse.data
      } else {
        this.showErrorResponse(pressResponse);
      }
      if (response?.success) {
        if (response.data.type.slug === ProjectTypes.renewable_energy) { // hide gallery on renewable projects
          this.links = ['about', 'yourImpact'];
        } else {
          this.links = ['about', 'yourImpact', 'gallery'];
        }
        this.project = response.data;
        this.sharedDataProjectService.project = response.data;
        this.projectSlug = this.project.type.slug;
        this.audioLink = this.projectSlug == 'marine_restoration' ? 
          'https://dkihjuum4jcjr.cloudfront.net/ES_ITUNES/Underwater%20Ambience%202/ES_Underwater%20Ambience%202.mp3' : 
          'https://gcs.earth.fm/wp-content/uploads/2023/02/earth-fm_Marc-Anderson_Malaysia_Montane_Rainforest_RX.mp3';
        if (this.project.image?.url) {
          this.photoURL = `url(${this.project.image.url})`;
        }
        if (this.project.video?.url) {
          this.videoURL = this.project.video.url + '&autoplay=1&loop=1&muted=1&background=1';
        }
        if (this.project.orbify) {
          this.orbifyURL = this.project.orbify
        }
        this.setLang();
        await this.loadWeather();
        await this.setTimeZone();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
    this.ngxService.stop();
  }

  toggleMute(): void{
    const audioPlayer = <HTMLAudioElement> document.getElementById('sound');
    this.stopped ? audioPlayer.play() : audioPlayer.pause();
    this.stopped = !this.stopped;
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      //this.projectInterface.name = this.projectInterface.name_it;
      this.project.description = this.project.description_it;
      this.project.country.name = this.project.country.name_it;
      this.project.country.continentName = this.project.country.continentName_it;
      this.project.projectData.overview = this.project.projectData.overview_it;
      this.project.projectData.scope = this.project.projectData.scope_it;
      this.project.projectData.biodiversity = this.project.projectData.biodiversity_it;
      this.project.projectData.specialCharacteristics = this.project.projectData.specialCharacteristics_it;
      this.project.projectData.ecosystem = this.project.projectData.ecosystem_it;
      this.project.projectData.absorption = this.project.projectData.absorption_it;
      this.project.projectData.problem = this.project.projectData.problem_it;
      this.project.projectData.support = this.project.projectData.support_it;
      this.project.projectData.economicDevelopment = this.project.projectData.economic_development_it;
    }
  }

  loadWeather = async () => {
    try {
      const response: Response<any> = await this.projectsService.getProjectWeather(
        this.project.projectData.latitude,
        this.project.projectData.longitude
      );
      if (response) {
        this.weather = response;
        this.temperature = this.roundNumber(this.weather.main.temp-273.15, 1)
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
      this.weather = {
        "coord": {
          "lon": 135.9885,
          "lat": -1.0084
        },
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04n"
          }
        ],
        "base": "stations",
        "main": {
          "temp": 297.34,
          "feels_like": 298.11,
          "temp_min": 297.34,
          "temp_max": 297.34,
          "pressure": 1012,
          "humidity": 88,
          "sea_level": 1012,
          "grnd_level": 1000
        },
        "visibility": 10000,
        "wind": {
          "speed": 1.23,
          "deg": 68,
          "gust": 2.06
        },
        "clouds": {
          "all": 99
        },
        "dt": 1662719443,
        "sys": {
          "country": "ID",
          "sunrise": 1662670249,
          "sunset": 1662713803
        },
        "timezone": 32400,
        "id": 1627453,
        "name": "Serui",
        "cod": 200
      }
    }
  }

  // retrieveStyleBackground(): any {
  //   return {
  //     background: 'url(' + this.project.image.url + ') no-repeat',
  //     'background-size': 'cover',
  //     'background-position': '50% 50%',
  //     'min-height': '600px'
  //   };
  // }

  isRestoration = (): boolean => {
    return this.project.type.slug === ProjectTypes.restoration;
  }
  isMarineRestoration = (): boolean => {
    return this.project.type.slug === ProjectTypes.marine_restoration;
  }
  isPreservation = (): boolean => {
    return this.project.type.slug === ProjectTypes.preservation;
  }
  isRenewable = (): boolean => {
    return this.project.type.slug === ProjectTypes.renewable_energy;
  }

  getPercentages(value1: number, value2: number, remainder: number): number[] {
    let temp = value1 * value2;
    remainder = temp % 1 * 100;
    temp = Math.floor(temp);
    remainder = Math.floor(remainder);
    const values = [temp, remainder];
    return values;
  }

  getPercentagesFlights(value1: number, remainder: number): number[] {
    let temp = (value1 * this.tonsCo2Km) / this.kmRomeNewYork;
    remainder = temp % 1 * 100;
    temp = Math.floor(temp);
    remainder = Math.floor(remainder);
    const values = [temp, remainder];
    return values;
  }

  twoDecimalPlaces(value: number): number {
    return Math.floor(value * 100) / 100;
  }

  inviteAFriend(): void {
    //  this.router.navigate(['welcomeOnBoard/share']);
    const dialog = this.dialog.open(ShareFriendsComponent, {panelClass: 'noPadding'});
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.slug);
      if (response?.success) {
        this.singlePaymentPacksInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  goToCheckout = async (slug: string): Promise<void> => {
    await this.router.navigate(['projects', slug, 'singleDonations'])
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }

  goToProject = async (slug: string): Promise<void> => {
    const companyId = localStorage.getItem('companyId');
    if (localStorage.getItem('token')) {
      await this.router.navigate(['admin', 'projects', slug]);
    } else if (companyId) {
      await this.router.navigate(['company', companyId, slug]);
    } else {
      await this.router.navigate(['projects', slug]);
    }
  }
}

