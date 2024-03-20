import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {Response} from '../../../../../../_models/api/response';
import {SinglePaymentPacksInterface} from '../../../../../../_models/api/public/single-payment-packs-interface';
import {SinglePaymentPacksService} from '../../../../../../_services/public/single-payment-packs.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectsService} from '../../../../../../_services/projects/projects.service';
import {ProjectsInterface} from '../../../../../../_models/api/projects/projects-interface';
import {ProjectGalleryInterface} from '../../../../../../_models/api/projects/project-gallery-interface';
import {GalleryService} from '../../../../../../_services/gallery.service';
import { ProjectTypes } from '../../../../../../_models/components/project-types';
import { ScriptService } from '../../../../../../_services/script.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-project-public-details',
  templateUrl: './project-public-details.component.html',
  styleUrls: ['./project-public-details.component.scss']
})
export class ProjectPublicDetailsComponent extends BaseComponent implements OnInit {
  singlePaymentPacksInterface: SinglePaymentPacksInterface;
  projectInterface: ProjectsInterface;
  projectGalleryInterface: ProjectGalleryInterface[] = [];
  projectSlug: string;
  projectPublicGallery: any[] = [];
  urlBg: string;
  characteristics: any;
  solution: any;
  summary: any;
  titleType: string;
  buttonSlug: string;
  buttonText: string;
  goalsImages = [];
  carouselImages = [];
  url = environment.url;
  items = [];
  constructor(
    private projectsService: ProjectsService,
    private singlePaymentPacksService: SinglePaymentPacksService,
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    private scriptService: ScriptService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectSlug = params.slug;
      this.getProjectBySlug();
      this.getProjectGallery();
      //this.scriptService.load('googleTranslateInit', 'googleTranslate').then(data => {}).catch(error => console.log(error));
    });
    this.url = this.url + this.router.url;
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      //this.projectInterface.name = this.projectInterface.name_it;
      this.projectInterface.description = this.projectInterface.description_it;
      this.projectInterface.country.name = this.projectInterface.country.name_it;
      this.projectInterface.country.continentName = this.projectInterface.country.continentName_it;
      this.projectInterface.projectData.overview = this.projectInterface.projectData.overview_it;
      this.projectInterface.projectData.scope = this.projectInterface.projectData.scope_it;
      this.projectInterface.projectData.biodiversity = this.projectInterface.projectData.biodiversity_it;
      this.projectInterface.projectData.specialCharacteristics = this.projectInterface.projectData.specialCharacteristics_it;
      this.projectInterface.projectData.ecosystem = this.projectInterface.projectData.ecosystem_it;
      this.projectInterface.projectData.absorption = this.projectInterface.projectData.absorption_it;
      this.projectInterface.projectData.problem = this.projectInterface.projectData.problem_it;
      this.projectInterface.projectData.support = this.projectInterface.projectData.support_it;
      this.projectInterface.projectData.economicDevelopment = this.projectInterface.projectData.economic_development_it;
      this.projectInterface.type.name = this.projectInterface.type.name_it;
    }
  }

  isRenewable(): boolean {
    return this.projectInterface.type.slug == ProjectTypes.renewable_energy;
  }

  isMarine(): boolean {
    return this.projectInterface.type.slug === ProjectTypes.marine_restoration && this.projectInterface.slug !== 'posi';
  }

  isVicenza(): boolean {
    return this.projectInterface?.name === 'Vicenza';
  }

  getProjectBySlug = async () => {
    try {
      const response: Response<ProjectsInterface> = await this.projectsService.getPublicProjectBySlug(this.projectSlug);
      if (response?.success) {
        this.projectInterface = response.data;
        this.setLang();
        this.getTitleType(this.projectInterface.type.slug, this.projectInterface.slug === 'posi');
        this.characteristics = [
          {title: this.translate.instant('projectDetailsPublic.biodiversity'), description: this.projectInterface.projectData.biodiversity},
          {title: this.translate.instant('projectDetailsPublic.co2Absorption'), description: this.projectInterface.projectData.absorption},
          {
            title: this.translate.instant('projectDetailsPublic.economicDevelopment'),
            description: this.projectInterface.projectData.economicDevelopment
          }];
        this.summary = [
          {
            title: this.translate.instant('projectDetailsSummary.acres'),
            description: this.projectInterface.projectData.acres,
            url: 'assets/images/svg/acres_special.svg'
          },
          {
            title: this.translate.instant('projectDetailsSummary.altitude'),
            description: this.projectInterface.projectData.altitude,
            url: 'assets/images/svg/altitude_special.svg'
          },
          {
            title: this.translate.instant('projectDetailsSummary.ecosystem'),
            description: this.projectInterface.projectData.ecosystem,
            url: 'assets/images/svg/ecosystem_special.svg'
          }];
        this.createImagesArray(this.projectInterface.projectData.goals, this.goalsImages);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getPayments = async () => {
    try {
      const response: Response<SinglePaymentPacksInterface> = await this.singlePaymentPacksService.getPackBySlug(this.projectSlug);
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

  setColor = (color: string) => {
    return {
      'background-color': color,
    };
  }

  createImagesArray(initialData: any, finalData: any[]): void {
    initialData.forEach(item => {
      finalData.push({
        path: item.image.url,
        name: item.name
      });
    });
    finalData.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  getProjectGallery = async () => {
    try {
      const response: Response<ProjectGalleryInterface[]> = await this.galleryService.getGalleryPublic(this.projectSlug);
      if (response?.success) {
        this.projectGalleryInterface = response.data;
        this.projectGalleryInterface.forEach(gallery =>{
            if(gallery.image.type == 'birds' ||
             gallery.image.type == 'mammals' ||
              gallery.image.type == 'amphibians'){
                let imageDetails =   {
                  image:gallery.image.url,
                  species: gallery.image.type == 'birds'?this.projectInterface?.projectData.birdSpecies
                  :gallery.image.type == 'mammals'?this.projectInterface?.projectData.mammalSpecies
                  :this.projectInterface?.projectData.amphibianSpecies,
                  labelSpecies: this.translate.instant(gallery.image.type == 'birds'?'about.birdSpecies':gallery.image.type == 'mammals'?'about.mammalSpecies':'about.amphibianSpecies')
                }
                this.projectPublicGallery.push(imageDetails)
            }
        })     
        this.createImagesArray(this.projectGalleryInterface, this.carouselImages);
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getTitleType(type: string, posidonia: boolean = false): void {
    switch (type) {
      case ProjectTypes.restoration: {
        this.titleType = this.translate.instant('aboutPublic.restorationTitle');
        this.buttonSlug = 'forest restoration';
        this.buttonText = this.translate.instant('aboutPublic.learnMoreRestoration');
        break;
      }
      case ProjectTypes.renewable_energy: {
        this.titleType = this.translate.instant('aboutPublic.renewableEnergyTitle');
        this.buttonSlug = 'deserts';
        this.buttonText = this.translate.instant('aboutPublic.learnMoreRenewableEnergy');
        break;
      }
      case ProjectTypes.preservation: {
        this.titleType = this.translate.instant('aboutPublic.preservationTitle');
        this.buttonSlug = 'tropical forests';
        this.buttonText = this.translate.instant('aboutPublic.learnMorePreservation');
        break;
      }
      case ProjectTypes.marine_restoration: {
        if (posidonia) {
          this.titleType = this.translate.instant('aboutPublic.posidoniaTitle');
          this.buttonSlug = 'meadows';
          this.buttonText = this.translate.instant('aboutPublic.learnMorePosidonia');
        } else {
          this.titleType = this.translate.instant('aboutPublic.marineRestorationTitle');
          this.buttonSlug = 'coral reef';
          this.buttonText = this.translate.instant('aboutPublic.learnMoreMarineRestoration');
        }
        break;
      }
    }
  }
}
