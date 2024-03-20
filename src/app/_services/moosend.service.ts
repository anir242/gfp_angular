import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { BaseService } from './_base/base.service';
import { ScriptService } from './script.service';


@Injectable({
  providedIn: 'root'
})

export class MoosendService extends BaseService{
  base: string = 'https://api.moosend.com/v3/';
  method: string = 'GET';
  zone: string;
  action: string;
  format: string = '.json';
  key: string = environment.moosendId;
  url: string;

  constructor(
    private http: HttpClient,
    private scriptService: ScriptService
  ) {
    super();
  }

  getUrl(listId?: string, params?: any) {
    let query = '';
    if (this.method.toUpperCase() == 'GET') {
      Object.keys(params).forEach(key => {
        const value = params[key];
        query += '&' + key + '=' + value;
      })
    }
    if (listId) {
      this.url = this.base + this.zone + '/' + listId + '/' + this.action + this.format + '?apikey=' + this.key + query;
    } else {
      this.url = this.base + this.zone + '/' + this.action + this.format + '?apikey=' + this.key + query;
    }
  }

  request = async (params?: any) => {
    switch (this.method.toUpperCase()) {
      case 'POST':
        return await this.http.post(this.url, params, {}).toPromise();
        break;
      default:
        return await this.http.get(this.url, {}).toPromise();
    }
  }

  subscribe(type: string, email: string, name: string, subType: string) {
    this.method = 'POST'
    let listId = environment.moosendList;
    if (type.toUpperCase() == 'B2B') {
      if (subType.toLowerCase().indexOf('leader') >= 0) {
        listId = environment.moosendListB2B;
      } else {
        listId = environment.moosendListB2B;
      }
    } else {
      listId = environment.moosendListB2C;
    }
    this.zone = 'subscribers';
    this.action = 'subscribe';
    this.getUrl(listId);
    this.request({
      "Name": name,
      "Email": email
    });
  }

  subscriber(email: string, type?: string) {
    let listId = environment.moosendList;
    if (type == 'B2C') {
      listId = environment.moosendListB2C;
    } else if (type == 'B2B') {
      listId = environment.moosendListB2B;
    }
    this.zone = 'subscribers';
    this.action = 'view';
    this.getUrl(listId, {
      'Email': email
    });
    this.request('GET');
  }

  trackPageView() {
  }

  identify(email: string, name?: string) {
  }

  trackLogin() {
  }

  viewProduct(id: string) {
    var product1 = {
      // mandatory - a unique code for the product, like its SKU
      itemCode: 'COW-T-SHIRT',
      // mandatory - the name / title of this product
      itemName: 'Cow T-Shirt',
      // mandatory - the image url of this product
      itemImage: 'http://your.store/product-color-blue.jpg',
      // mandatory - the price of this product
      itemPrice: 12.02,
      // mandatory - the url to get to the relevant product page
      itemUrl: 'http://your.store/product-101',
      // mandatory
      itemQuantity: 2,
      // mandatory - the total price for purchasing the given quantity of this product
      itemTotalPrice: 24.04,
      // optional - the category of this product
      itemCategory: 'T-Shirts',
      // optional - the manufacturer, brand name or company / owner of this product (if any)
      itemManufacturer: 'Acme Co',
      // optional - the supplier of this product (if any)
      itemSupplier: 'Supplier Co',

      // you can add custom properies and later use them in segmentations or automations
      color: 'Red', // You can track things like the color
      size: 'XXL' // or the size of the t-shirt in this case
    };

    // Product should be sent back as an array with an object which includes the product above
    var productInfo = [{ product: product1 }];
    //mootrack('PAGE_VIEWED', productInfo);
  }

  addToCart (id: string) {
    // mandatory - a unique code for the product, like its SKU
    var itemCode = 'COW-T-SHIRT';
    // mandatory - the name / title of this product
    var itemName = 'Cow T-Shirt';
    // mandatory - the image url of this product
    var itemImage = 'http://your.store/product-color-blue.jpg';
    // mandatory - the price of this product
    var itemPrice = 12.02;
    // mandatory - the url to get to the relevant product page
    var itemUrl = 'http://your.store/product-101';
    // mandatory
    var itemQuantity = 2;
    // mandatory - the total price for purchasing the given quantity of this product
    var itemTotalPrice = 24.04;
    // optional - the category of this product
    var itemCategory = 'T-Shirts';
    // optional - the manufacturer, brand name or company / owner of this product (if any)
    var itemManufacturer = 'Acme Co';
    // optional - the supplier of this product (if any)
    var itemSupplier = 'Supplier Co';

    // you can add custom properies and later use them in segmentations or automations
    // You can track things like the color or the sze of the t-shirt in this case
    var extraProps = { 'color': 'Red', 'size': 'XXL' };

    // Tracking add to cart events with mandatory arguments
    //mootrack('trackAddToOrder', itemCode, itemPrice, itemUrl, itemQuantity, itemTotalPrice);

    // Tracking add to cart events with mandatory arguments + optional
  }

  completeOrder(id: string) {
    // send order completed events
    var product1 = {
      // mandatory - a unique code for the product, like its SKU
      itemCode: 'COW-T-SHIRT',
      // mandatory - the name / title of this product
      itemName: 'Cow T-Shirt',
      // mandatory - the image url of this product
      itemImage: 'http://your.store/product-color-blue.jpg',
      // mandatory - the price of this product
      itemPrice: 12.02,
      // mandatory - the url to get to the relevant product page
      itemUrl: 'http://your.store/product-101',
      // mandatory
      itemQuantity: 2,
      // mandatory - the total price for purchasing the given quantity of this product
      itemTotalPrice: 24.04,
      // optional - the category of this product
      itemCategory: 'T-Shirts',
      // optional - the manufacturer, brand name or company / owner of this product (if any)
      itemManufacturer: 'Acme Co',
      // optional - the supplier of this product (if any)
      itemSupplier: 'Supplier Co',

      // you can add custom properies and later use them in segmentations or automations
      color: 'Red', // You can track things like the color
      size: 'XXL' // or the size of the t-shirt in this case
    };

    // Products should be an array with an object like product.
    var products = [product1,];
  }
}
