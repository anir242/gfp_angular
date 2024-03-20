import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShopifyService} from '../../../../../../_services/callback/shopify.service';
import {Response} from '../../../../../../_models/api/response';
import {BaseComponent} from '../../../../../_base/base/base.component';
import {UntypedFormControl, Validators} from '@angular/forms';
import {StorageName} from "../../../../../../_models/components/storage-name";

@Component({
  selector: 'app-ecommerce-type',
  templateUrl: './ecommerce-type.component.html',
  styleUrls: ['./ecommerce-type.component.scss']
})
export class EcommerceTypeComponent extends BaseComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() slug: string;
  @Input() isSelected: boolean;
  @Input() enableButton = false;
  @Output() nextStep = new EventEmitter();
  shopName = new UntypedFormControl('', Validators.required);
  enable = false
  constructor(
    private shopifyService: ShopifyService
  ) {
    super();
  }

  ngOnInit(): void {
  }

  async connect(): Promise<void> {
    if (!this.enable) {
      this.enable = true;
    } else {
      switch (this.slug) {
        case 'shopify' :
          if (this.shopName.valid){
            localStorage.setItem(StorageName.shopName, this.shopName.value)
            await this.loadShopify({
              shopName: this.shopName.value
            });
          }
          break;
      }
    }
  }

  loadShopify = async (params?) => {
    try {
      const response: Response<string> = await this.shopifyService.shopifyStartConnection(params);
      if (response?.success) {
        window.open(response.data, '_blank');
        this.enable = false;
        this.nextStep.emit();
      } else {
        this.showErrorResponse(response);
      }
    } catch (e) {
      this.showErrorResponse(e);

    }
  }
}
