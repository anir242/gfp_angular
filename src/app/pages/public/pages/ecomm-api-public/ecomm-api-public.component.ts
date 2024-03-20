import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';
import { SingleFaqInterface } from 'src/app/_models/api/public/faq/single-faq-interface';
import { RoutingTypes } from 'src/app/_models/components/routing-types';
import { CalendlyPopupComponent } from '../../components/calendly-popup/calendly-popup.component';

@Component({
  selector: 'app-ecomm-api-public',
  templateUrl: './ecomm-api-public.component.html',
  styleUrls: ['./ecomm-api-public.component.scss'],
})
export class EcommApiPublicComponent extends BaseComponent implements OnInit {
  business: boolean = localStorage.getItem('clientType') === '2';
  routingTypes = RoutingTypes;
  impactItem = [
    {
      imgURL: 'assets/images/lightning.png',
      headerText: 'ecommAPI.manageImpactHeading',
      bodyText: 'ecommAPI.manageImpactDesc',
    },
    {
      imgURL: 'assets/images/share.png',
      headerText: 'ecommAPI.showImpactHeading',
      bodyText: 'ecommAPI.showImpactDesc',
    },
    {
      imgURL: 'assets/images/live.png',
      headerText: 'ecommAPI.liveExpHeading',
      bodyText: 'ecommAPI.liveExpDesc',
    },
    {
      imgURL: 'assets/images/plant.png',
      headerText: 'ecommAPI.engageEmpHeading',
      bodyText: 'ecommAPI.engageEmpDesc',
    },
  ];
  mockFaq = {
    url: 'https://green-future-project.s3.eu-central-1.amazonaws.com/mockFaq_b00696e6-61fc-419d-b58f-492aaf0a40c5',
    title: this.translate.instant('faq.mockTitle'),
    content: this.translate.instant('faq.mockDescription'),
  };
  singleFaqInterface: SingleFaqInterface[];
  timeOutIds = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.viewProduct();
    this.timeOutIds.push(setTimeout(() => this.displayPopup(), 10000));
  }

  ngOnDestroy() {
    this.timeOutIds.forEach((id) => clearTimeout(id));
  }

  viewProduct() {
    this.track('view_item', [
      this.asProduct(
        'ecommerce-app-api',
        'Ecommerce & App API',
        'EUR',
        0,
        1,
        'subscription',
        'subscriptions',
        'business',
        'subscriptions',
        'Subscriptions'
      ),
    ]);
  }

  goToCheckout = () => {
    this.router.navigate([RoutingTypes.PIONEER_CHECKOUT]);
  };

  displayPopup(): void {
    this.dialog.open(CalendlyPopupComponent, {
      data: {
        buttonUrl: 'https://page.greenfutureproject.com/meeting-popup',
        type: 'demo',
      },
      panelClass: 'noPadding',
    });
  }
}
