import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GiftComponent} from './pages/gift/gift.component';
import {GiftDetailsComponent} from './pages/gift-details/gift-details.component';
import {GiftCartComponent} from './pages/gift-cart/gift-cart.component';
import {GiftCheckOutComponent} from './pages/gift-check-out/gift-check-out.component';
import {WelcomeOnBoardComponent} from '../welcome-on-board/welcome-on-board.component';

const routes: Routes = [
  {
    path: '',
    component: GiftComponent,
    data: {
      breadcrumb: 'gift'
    },
    title: 'GFP | Gifts'
  },
  {
    path: 'cart',
    component: GiftCartComponent,
    title: 'GFP | Gift Cart'
  },
  {
    path: 'checkOut',
    component: GiftCheckOutComponent,
    title: 'GFP | Gift Checkout'
  },
  {
    path: 'welcomeOnBoard',
    component: WelcomeOnBoardComponent,
    title: 'GFP | Welcome on Board!'
  },
  {
    path: ':id',
    component: GiftDetailsComponent,
    title: 'GFP | Gift Details'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftRoutingModule { }
