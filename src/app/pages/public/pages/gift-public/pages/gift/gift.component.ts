import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {BannerDialogComponent} from '../../../../dialogs/banner-dialog/banner-dialog.component';
import {OccasionsInterface} from '../../../../../../_models/api/public/occasions-interface';
import {OccasionsService} from '../../../../../../_services/public/occasions.service';
import {Response} from '../../../../../../_models/api/response';
import {ProjectTypologyInterface} from '../../../../../../_models/api/public/project-typology-interface';
import {GiftCardInterface} from '../../../../../../_models/api/public/gift-card-interface';
import {GiftService} from '../../../../../../_services/public/gift.service';
import {GiftCardPacksInterface} from '../../../../../../_models/api/public/gift-card-packs-interface';
import {FilterService} from '../../../../../../_services/public/local/filter.service';
import {UntypedFormControl, Validators} from '@angular/forms';
import {filter} from 'rxjs';
import {FilterPopupComponent} from '../../../../components/filter-popup/filter-popup.component';
import { environment } from '../../../../../../../environments/environment';
import { ScriptService } from '../../../../../../_services/script.service';
import {ProgressTypes} from '../../../../../../_models/components/progress-types';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss']
})
export class GiftComponent extends BaseComponent implements OnInit {
  progressTypes = ProgressTypes;
  occasionsInterface: OccasionsInterface;
  giftCardInterface: GiftCardInterface[];
  filteredCard: GiftCardInterface[];
  continent = [];
  typology = [];
  projectTypes = [];
  projectType: string;
  color: string;
  defaultInput = '';
  showBusiness = environment.showBusiness;
  searchInput = new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]);
  howTo = [
    {text: this.translate.instant('gift.choose')},
    {text: this.translate.instant('gift.recipient')},
    {text: this.translate.instant('gift.activation')},
  ];

  constructor(
    private giftService: GiftService,
    public filterService: FilterService,
    private occasionsService: OccasionsService,
    private scriptService: ScriptService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getGiftCards().then(() => {
      this.setFilters();
    });
    this.getCurrentOccasion().then(() => {
      this.bannerDialog();
    });
    this.searchCard();
    this.filterProject();
    //this.scriptService.load('googleTranslateInit', 'googleTranslate').then(data => {}).catch(error => console.log(error));
  }

  setLang(type: string): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      switch (type) {
        case 'gift':
          this.giftCardInterface.forEach(item => {
            item.description = item.description_it;
            item.content = item.content_it;
          });
          break;
        case 'occasion':
          this.occasionsInterface.title = this.occasionsInterface.title_it;
          this.occasionsInterface.description = this.occasionsInterface.description_it;
          this.occasionsInterface.selectorName = this.occasionsInterface.selectorName_it;
          break;
      }
    }
  }

  searchCard(): void {
    this.searchInput.valueChanges.subscribe(x => {
      this.filteredCard = this.giftCardInterface.filter(y =>
        y.title.toLocaleLowerCase().includes(x)
      );
      this.filterService.resetFilter();
    });
    /*      this.filteredCard = this.giftCardInterface.filter(y =>
            y.title.toLocaleLowerCase().includes(this.searchInput.value)
          );
          this.filterService.resetFilter();*/
  }

  filterProject(): void {
    this.filterService.dataUpdated.subscribe(() => {
      this.defaultInput = '';
      this.saveSelection();
    });
  }

  bannerDialog(): void {
    if (window.innerWidth < 768) {
      this.dialog.open(BannerDialogComponent,
        {
          data: {
            url: this.occasionsInterface.iconImage.url,
            title: this.occasionsInterface.title,
            description: this.occasionsInterface.description,
            color: this.occasionsInterface.color
          }, panelClass: 'noPadding'
        }
      );
    }
  }

  async selectGift(projId: string): Promise<void> {
    await this.router.navigate([RoutingTypes.GIFT, projId]);
  }

  async getCurrentOccasion(): Promise<void> {
    try {
      const response: Response<OccasionsInterface> = await this.occasionsService.getCurrentOccasion();
      if (response?.success) {
        this.occasionsInterface = response.data;
        //Error
        //this.setLang('occasion');
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }

  async getGiftCards(): Promise<void> {
    try {
      const response: Response<GiftCardInterface[]> = await this.giftService.getGiftCards();
      if (response?.success) {
        this.giftCardInterface = response.data;
        this.filteredCard = this.giftCardInterface;
        this.setLang('gift');
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getMinimumPrice(item: GiftCardPacksInterface[]): any {
    return Math.min(...item.map(x => x.giftCardValue));
  }

  getLocation(id: string): any {
    const currentCard = this.giftCardInterface.filter(x => x.id === id)[0];
    const locations = currentCard.giftCardPacks.map(item => item.giftCardProjects.map(y => y.project.country.name));
    const locationsArray = locations.flat().filter((elem, index, self) => {
      return index === self.indexOf(elem);
    });
    if (currentCard.typeId) {
      this.projectType = currentCard.type.name;
      this.color = currentCard.type.colorLabel;
    } else {
      this.color = '#D3DFDB';
      this.projectType = this.translate.instant('gift.subscriptions');
    }
    /*    if (locationsArray.length === 1) {
          this.projectType = currentCard.giftCardPacks[0].giftCardProjects[0].project.type.name;
          this.color = currentCard.giftCardPacks[0].giftCardProjects[0].project.type.colorLabel;
        } else {
          this.color = '#D3DFDB';
          this.projectType = this.translate.instant('gift.subscriptions');
        }*/
    return locationsArray;
  }

  setFilters(): void {
    if (this.giftCardInterface) {
      this.giftCardInterface.forEach(item => {
        item.giftCardPacks.forEach(x => {
          if (x.giftCardProjects.length > 1) {
            this.projectTypes.push(this.translate.instant('gift.subscriptions'));
          } else {
            this.projectTypes.push(x.giftCardProjects[0].project.type.name);
          }
          x.giftCardProjects.map(y => {
            this.continent.push(y.project.country.name);
          });
        });
      });
      this.continent = this.removeDuplicate(this.continent);
      this.continent.unshift(this.translate.instant('gift.allContinents'));
      this.projectTypes = this.removeDuplicate(this.projectTypes);
      this.projectTypes.unshift(this.translate.instant('gift.allTypologies'));
    }

  }

  removeDuplicate(data: any): any {
    data = data.filter((element, i) => i === data.indexOf(element));
    return data;
  }

  saveSelection(): void {
    const items = this.filterService.getItems();
    if (items.giftTypology === this.translate.instant('gift.allTypologies') && items.giftContinent === this.translate.instant('gift.allContinents')) {
      this.filteredCard = this.giftCardInterface;
    } else if (items.giftContinent === this.translate.instant('gift.allContinents')) {
      this.filteredCard = [];
      this.filteredCard = this.getTypology();
    } else if (items.giftTypology === this.translate.instant('gift.allTypologies')) {
      this.filteredCard = [];
      this.filteredCard = this.getContinent();
    } else {
      const filteredContinent = this.getContinent();
      const filteredTypology = this.getTypology();
      if (filteredTypology.length > filteredContinent.length) {
        this.filteredCard = filteredTypology.filter(value => filteredContinent.includes(value));
      } else {
        this.filteredCard = filteredContinent.filter(value => filteredTypology.includes(value));
      }
    }
  }

  getContinent(): any {
    const items = this.filterService.getItems();
    let filtered = [];
    const temp = [];
    this.giftCardInterface.forEach(item => {
      item.giftCardPacks.forEach(x => {
        x.giftCardProjects.forEach(y => {
          if (y.project.country.name === items.giftContinent) {
            filtered.push(item);
            temp.push(item);
          }
        });
      });
      filtered = this.removeDuplicate(temp);
    });
    return filtered;
  }

  getTypology(): any {
    const items = this.filterService.getItems();
    const temp = [];
    let filtered = [];
    this.giftCardInterface.forEach(item => {
      item.giftCardPacks.forEach(x => {
          if (x.giftCardProjects.length === 1) {
            if (x.giftCardProjects[0].project.type.name === items.giftTypology) {
              temp.push(item);
            }
          } else if (items.giftTypology === this.translate.instant('gift.subscriptions')) {
            temp.push(item);
          }
        }
      );
      filtered = this.removeDuplicate(temp);
    });
    return filtered;
  }

  openFilterPopup(): void {
    const dialog = this.dialog.open(FilterPopupComponent, {
      data: {
        continent: this.continent,
        projectTypes: this.projectTypes,
        type1: 'giftTypology',
        type2: 'giftContinent',
        label1: this.translate.instant('gift.typology'),
        label2: this.translate.instant('gift.continent'),
      }, width: '80%'
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.defaultInput = '';
        this.saveSelection();
      }
    });
  }

  getInTouch(): void {
    this.scrollToId('footer');
  }
}

