import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Response} from '../../../../_models/api/response';
import {GiftCardInterface} from '../../../../_models/api/public/gift-card-interface';
import {BaseComponent} from '../../../_base/base/base.component';
import {GiftService} from '../../../../_services/public/gift.service';
import {ActivatedRoute} from '@angular/router';
import {GiftCardPacksInterface} from '../../../../_models/api/public/gift-card-packs-interface';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {OrderSummaryService} from '../../../../_services/public/local/order-summary.service';
import {damp} from 'three/src/math/MathUtils';
import {CartTypes} from '../../../../_models/components/cart-types';
import {CartInterface} from '../../../../_models/cart-interface';

@Component({
  selector: 'app-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.scss']
})
export class GiftEditComponent extends BaseComponent implements OnInit {
  giftCardInterface: GiftCardInterface;
  selectedGiftCard: GiftCardPacksInterface;
  selectedDiv: string;
  giftData = new UntypedFormGroup({
    giftFor: new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    }),
    occasion: new UntypedFormGroup({
      occasion: new UntypedFormControl('', []), //required?
      deliveryDate: new UntypedFormControl('', []),
    }),
    message: new UntypedFormGroup({
      choose: new UntypedFormControl(''),
      message: new UntypedFormControl(''),
    }),
  });

  constructor(
    private giftService: GiftService,
    private cartService: OrderSummaryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCard().then();
  }

  async getCard(): Promise<void> {
    try {
      const response: Response<GiftCardInterface> = await this.giftService.getGiftCardsById(this.data.id);
      if (response?.success) {
        this.giftCardInterface = response.data;
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);
    }
  }

  highlight(divId: string): any {
    this.selectedGiftCard = this.giftCardInterface.giftCardPacks.filter(x => x.id === divId)[0];
    this.selectedDiv = divId;
  }

  fillCart(): void{
    let cart: CartInterface;
    cart = {
      id: this.giftCardInterface.id,
      internalType: CartTypes.GIFT,
      name: "",
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
    this.cartService.deleteItem(this.data);
    this.cartService.addToCart(cart);
    // this.cartService.switchItem(this.data.item.gift.giftCardPack, this.selectedGiftCard, CartTypes.GIFT);
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
  getCo2(): any{
    let co2 = 0;
    this.selectedGiftCard.giftCardProjects.forEach(item => {
      co2 += item.quantity * item.unit.co2KgPerUnit;
    });
    co2 = this.roundNumber(co2 / 1000);
    return co2;
  }
  getOccasions(): any {
    return this.giftCardInterface?.giftCardOccasions.map(item => item.occasion.selectorName);
  }

}
