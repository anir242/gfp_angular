import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../_base/base/base.component';
import {ActivatedRoute} from '@angular/router';
import {ShopifyService} from '../../../_services/callback/shopify.service';
import {Response} from '../../../_models/api/response';
import {AlertTypes} from '../../../_models/components/alert-types';
import {StorageName} from "../../../_models/components/storage-name";

@Component({
  selector: 'app-shopify-connection',
  templateUrl: './shopify-connection.component.html',
  styleUrls: ['./shopify-connection.component.scss']
})
export class ShopifyConnectionComponent extends BaseComponent implements OnInit {
  code: string;
  state: string;

  constructor(
    private route: ActivatedRoute,
    private shopifyService: ShopifyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadShopifyConnection().then();
  }


  loadShopifyConnection = async () => {
    this.code = this.route.snapshot.queryParams.code;
    this.state = this.route.snapshot.queryParams.state;
    const shopName = localStorage.getItem(StorageName.shopName);
    localStorage.removeItem(StorageName.shopName);
    const params = {
      code: this.code,
      state: this.state,
      shopName
    };

    const response: Response<boolean> = await this.shopifyService.shopifyConnection(params);
    if (response?.success) {
      window.close();

    } else {
      await this.showAlert({
        text: this.translate.instant('shopify.errorText'),
        title: this.translate.instant('shopify.errorTitle'),
        type: AlertTypes.titleAndText
      });
    }
  }
}
