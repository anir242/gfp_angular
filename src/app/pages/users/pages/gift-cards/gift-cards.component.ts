import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../_base/base/base.component";
import {GiftService} from "../../../../_services/public/gift.service";
import {StorageName} from "../../../../_models/components/storage-name";
import {UsersService} from "../../../../_services/users/users.service";
import {Response} from "../../../../_models/api/response";
import {GiftCardRecipientInterface} from "../../../../_models/api/public/gift-card-recipient-interface";

@Component({
  selector: 'app-gift-cards',
  templateUrl: './gift-cards.component.html',
  styleUrls: ['./gift-cards.component.scss']
})
export class GiftCardsComponent extends BaseComponent implements OnInit {
  giftCards: GiftCardRecipientInterface[];

  constructor(
    private usersService: UsersService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadMyGiftCards().then();
  }


  loadMyGiftCards = async () => {
    try {
      const response: Response<any[]> = await this.usersService.getUserGiftCards(localStorage.getItem(StorageName.id));
      if (response?.success) {
        this.giftCards = response.data;
      } else {
        this.showErrorResponse(response)
      }
    } catch (e) {
      this.showErrorResponse(e)
    }
  }
}
