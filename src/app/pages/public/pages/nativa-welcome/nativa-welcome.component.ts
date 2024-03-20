import {Component, Input, OnInit} from '@angular/core';
import {OrderSummaryService} from '../../../../_services/public/local/order-summary.service';
import {BaseComponent} from '../../../_base/base/base.component';
import {Router} from '@angular/router';
import {RoutingTypes} from '../../../../_models/components/routing-types';
import {CartInterface} from '../../../../_models/cart-interface';
import {CartTypes} from '../../../../_models/components/cart-types';

@Component({
  selector: 'app-nativa-welcome',
  templateUrl: './nativa-welcome.component.html',
  styleUrls: ['./nativa-welcome.component.scss']
})
export class NativaWelcomeComponent extends BaseComponent implements OnInit {
  total: number;
  items: CartInterface[];
  cartType: string;
  countryPolicy: string = 'none';
  isFreeAvailable: boolean = false;

  constructor(
    private cartService: OrderSummaryService,
    private internalRouter: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.setLangItalian().subscribe({
      complete: () => {
        this.items = this.cartService.getItems();
        this.cartType = CartTypes.SINGLE_DONATION
      }
    });
    const transactionData = JSON.parse(localStorage.getItem('nativaTransactionData'));
    if(transactionData.billingCountry === 'Italy'){
      this.countryPolicy = 'italian';
    }
    this.isFreeAvailable = transactionData.isFreeAvailable
  }

  setLangItalian(){
    return this.translate.use('it');
  }

  async openAdminPanel(): Promise<any> {
    await this.internalRouter.navigate([RoutingTypes.ADMIN]);
  }

  navigateToFaq(): any {
    this.router.navigate([RoutingTypes.FAQ]).then();
  }

  navigateToHomePage(): any {
    this.router.navigate(['/']).then();
  }
}
