import {Component, Input, OnInit} from '@angular/core';
import {ProgressTypes} from '../../../../../../_models/components/progress-types';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {GiftService} from '../../../../../../_services/public/gift.service';
import {Response} from '../../../../../../_models/api/response';
import {GiftCardInterface} from '../../../../../../_models/api/public/gift-card-interface';
import {ActivatedRoute} from '@angular/router';
import {CartTypes} from '../../../../../../_models/components/cart-types';
import {UnitTypes} from '../../../../../../_models/components/unit-types';
import {GiftCardProjects} from '../../../../../../_models/api/public/gift-card-projects';
import {element} from 'protractor';
import {ProjectsInterface} from '../../../../../../_models/api/projects/projects-interface';
import {GiftCardPacksInterface} from '../../../../../../_models/api/public/gift-card-packs-interface';
import {GiftCartPopupComponent} from '../../components/gift-cart-popup/gift-cart-popup.component';
import {GiftPickInfoComponent} from '../../components/gift-pick-info/gift-pick-info.component';
import {coerceStringArray} from '@angular/cdk/coercion';
import {RoutingTypes} from '../../../../../../_models/components/routing-types';
import {CartInterface} from '../../../../../../_models/cart-interface';
import {OrderSummaryService} from '../../../../../../_services/public/local/order-summary.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.component.html',
  styleUrls: ['./gift-details.component.scss']
})
export class GiftDetailsComponent extends BaseComponent implements OnInit {
  progressTypes = ProgressTypes;
  giftCardInterface: GiftCardInterface;
  selectedGiftCard: GiftCardPacksInterface;
  locationArray: ProjectsInterface[];
  cartInterface: CartInterface;
  cardProjects: any;
  qualityList = [];
  color = '#D3DFDB';
  projectType: string;
  projectSlug: string;
  projectDescription: string;
  projectId: string;
  unitSlug: string;
  selectedDiv: string;
  imgUrl: string;
  svgUrl: string;

  item = [
    {text: this.translate.instant('gift.choose')},
    {text: this.translate.instant('gift.recipient')},
    {text: this.translate.instant('gift.activation')},
  ];

  giftData = new UntypedFormGroup({
    giftFor: new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    }),
    occasion: new UntypedFormGroup({
      occasion: new UntypedFormControl('', []),
      deliveryDate: new UntypedFormControl('', []),
    }),
    message: new UntypedFormGroup({
      choose: new UntypedFormControl(''),
      message: new UntypedFormControl(''),
    }),
  });

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private cartService: OrderSummaryService,
    private giftService: GiftService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getId();
    this.getGiftCards().then();
    this.getImage();
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.giftCardInterface.description = this.giftCardInterface.description_it;
      this.giftCardInterface.content = this.giftCardInterface.content_it;
      this.giftCardInterface.giftCardOccasions.forEach(item => {
        item.occasion.description = item.occasion.description_it;
        item.occasion.title = item.occasion.title_it;
        item.occasion.selectorName = item.occasion.selectorName_it;
      });
    }
  }

  viewProducts() {
    const products: any[] = [];
    this.giftCardInterface.giftCardPacks?.forEach((pack) => {
      products.push(this.asProduct(
        pack.id, this.giftCardInterface.title, 'EUR', pack.giftCardValue, 1, pack.giftCardValue.toString(), 
        'gifts', this.giftCardInterface.title, 'gifts', 'Gifts'
      ));
    });
    this.track('view_item_list', products);
  }

  selectProduct(): void {
    this.track('select_item', [
      this.asProduct(
        this.selectedGiftCard.id, this.giftCardInterface.title, 'EUR', this.selectedGiftCard.giftCardValue, 1, this.selectedGiftCard.giftCardValue.toString(), 
        'gift', this.giftCardInterface.title, 'gifts', 'Gifts'
      )
    ]);
  }

  trackCart(): void {
    this.track('add_to_cart', [
      this.asProduct(
        this.selectedGiftCard.id, this.giftCardInterface.title, 'EUR', this.selectedGiftCard.giftCardValue, 1, this.selectedGiftCard.giftCardValue.toString(), 
        'gift', this.giftCardInterface.title, 'gifts', 'Gifts'
      )
    ]);
  }

  getSummaryTitle(): any {
    let titles = [];
    if (this.giftCardInterface.typeId) {
      this.giftCardInterface.giftCardPacks.forEach(x => {
          x.giftCardProjects.map(y => titles.push(y.unit.slug));
      });
      titles = this.removeDuplicate(titles);
      if (titles.includes('coral')){
        this.projectDescription = this.translate.instant('giftBreadcrumb.coral');
      }else{
        this.projectDescription = this.translate.instant('giftBreadcrumb.' + titles[0]);
      }
    }else{
      this.projectDescription = this.translate.instant('giftBreadcrumb.subscription');
    }
  }
  removeDuplicate(data: any): any {
    data = data.filter((element, i) => i === data.indexOf(element));
    return data;
  }
  async getGiftCards(): Promise<void> {
    try {
      const response: Response<GiftCardInterface> = await this.giftService.getGiftCardsById(this.projectId);
      if (response?.success) {
        this.giftCardInterface = response.data;
        this.getLocation();
        this.getSummaryTitle();
        this.setLang();
        if (this.projectType !== this.translate.instant('gift.subscriptions')) {
          this.getList();
        }
        this.viewProducts();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  getLocation(): any {
    const locations = this.giftCardInterface.giftCardPacks.map(item => item.giftCardProjects.map(item => item.project));
    const locationsArray = locations.flat().filter((elem, index, self) => {
      return index === self.map(it => it.id).indexOf(elem.id);
    });
    if (this.giftCardInterface.typeId) {
      this.projectType = this.giftCardInterface.type.name;
      this.color = this.giftCardInterface.type.colorLabel;
    } else {
      this.projectType = this.translate.instant('gift.subscriptions');
    }
    this.locationArray = locationsArray;
  }

  getList(): void {
    this.qualityList = JSON.parse(this.giftCardInterface.content);
  }

  highlight(divId: string): any {
    this.selectedGiftCard = this.giftCardInterface.giftCardPacks.filter(x => x.id === divId)[0];
    this.selectedDiv = divId;
    this.selectProduct();
  }

  getCo2(): any {
    let co2 = 0;
    this.selectedGiftCard.giftCardProjects.forEach(item => {
      co2 += item.quantity * item.unit.co2KgPerUnit;
    });
    co2 = this.roundNumber(co2 / 1000);
    return co2;
  }

  fillCart(): void {
    this.cartInterface = {
      id: this.giftCardInterface.id,
      internalType: CartTypes.GIFT,
      name: this.giftCardInterface.title,
      gift: {
        type: this.giftCardInterface.type,
        giftCardPack: this.selectedGiftCard,
        recipientEmail: this.giftFor?.value.email,
        recipientName: this.giftFor?.value.name,
        deliveryDate: this.occasion.value.deliveryDate,
        message: this.message.value?.message,
        image: this.giftCardInterface.image,
        giftCardOccasion: this.giftCardInterface.giftCardOccasions.filter(item => item.occasion.selectorName === this.occasion.value.occasion).map(x => x.occasion)[0],
      },
    };
  }

  addToCart(event: boolean): void {
    this.fillCart();

    if ((this.selectedGiftCard && this.giftData.valid) || this.cartService.getItems().length > 0) {
      this.cartService.addToCart(this.cartInterface);
      this.giftFor.reset();
      this.occasion.reset();
      this.message.reset();
      if (event){
        this.router.navigate([RoutingTypes.CHECK_OUT]).then();
      }
    }else{
      this.giftFor.markAllAsTouched();
    }
    this.trackCart();
  }

  getUnitSlug(unit: string): void {
    this.unitSlug = this.translate.instant('gift.' + unit);
    switch (unit) {
      case UnitTypes.ACRE: {
        this.svgUrl = 'assets/images/svg/tree_one.svg';
        break;
      }
      case UnitTypes.KWH: {
        this.svgUrl = 'assets/images/svg/tree_one.svg';
        break;
      }
      case UnitTypes.CORAL: {
        this.svgUrl = 'assets/images/svg/tree_one.svg';
        break;
      }
      default:
        this.svgUrl = 'assets/images/svg/tree_one.svg';
        break;
    }
  }

  getUnits(): any {
    const units = [];
    if (this.selectedGiftCard.packTitle) {
      units.push(this.translate.instant('gift.' + this.selectedGiftCard.packTitle));
      return units;
    } else {
      if (this.selectedGiftCard.giftCardProjects.length > 1) {
        let singleCoral = false;
        this.selectedGiftCard.giftCardProjects.filter(x => {
          if (x.unit.slug === UnitTypes.CORAL){
            units.push(x.quantity);
            singleCoral = x.quantity == 1;
          }
        });
        this.unitSlug = singleCoral ? this.translate.instant('gift.singleCoral') : this.translate.instant('gift.coral');
      } else {
        let singleItem = false;
        this.selectedGiftCard.giftCardProjects.map(item => {
          units.push(item.quantity);
          singleItem = item.quantity == 1;
        });
        this.unitSlug = this.selectedGiftCard.giftCardProjects[0]?.unit.slug;
        if (singleItem && this.unitSlug == 'acres') {
          this.unitSlug = 'acre';
        }
      }
      return this.translate.instant('gift.gift', {value: units, slug: this.unitSlug});
    }
  }

  getOccasions(): any {
    return this.giftCardInterface.giftCardOccasions.map(item => item.occasion.selectorName);
  }

  openInfo(): void {
    this.dialog.open(GiftPickInfoComponent, {width: '80%', height: '70%'});
  }

  isValid(): any {
    return this.cartService.getItems().length == 0 || this.selectedGiftCard;
    // return this.giftData.valid && this.selectedGiftCard;
  }

  getImage(): any {
    this.occasion.get('occasion').valueChanges.subscribe(item => {
      this.imgUrl = this.giftCardInterface?.giftCardOccasions?.filter(x => x.occasion.title === item).map(x => x.occasion.placeholderImage.url)[0];
    });
  }

  getId(): void {
    this.projectId = this.route.snapshot.params.id;
  }

  get cartItems(): GiftCartItem[] {
    let items: GiftCartItem[] = this.cartService.getItems().length > 0 ? this.cartService.getItems().map((item) => {
      if(!item.gift) return;
      return {
        amount: item?.gift?.giftCardPack?.giftCardValue,
        title: this.cartService.getProjectName(item, CartTypes.GIFT),
        unit: this.cartService.getUnitCard(item, CartTypes.GIFT),
        amountUnit: this.cartService.getProjectAmount(item, CartTypes.GIFT)
      }
    }) : [];
    return items;
  }

  get subTotal(): number {
    return this.cartService.getItems().length > 0 ? this.cartService.getTotal().totalCost : this.selectedGiftCard?.giftCardValue;
  }

  get giftFor(): UntypedFormGroup {
    return this.giftData.get('giftFor') as UntypedFormGroup;
  }

  get occasion(): UntypedFormGroup {
    return this.giftData.get('occasion') as UntypedFormGroup;
  }

  get message(): UntypedFormGroup {
    return this.giftData.get('message') as UntypedFormGroup;
  }
}

export class GiftCartItem {
  title: string;
  amount: number;
  unit: string;
  amountUnit: string;
}