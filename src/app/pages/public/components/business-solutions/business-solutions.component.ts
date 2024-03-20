import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingTypes } from 'src/app/_models/components/routing-types';


@Component({
  selector: 'app-business-solutions',
  templateUrl: './business-solutions.component.html',
  styleUrls: ['./business-solutions.component.scss']
})
export class BusinessSolutionsComponent implements OnInit {
  @Input() business: boolean;
  BusinessSolutionsOption: any = BusinessSolutionsOption;
  selectedOption: any = BusinessSolutionsOption['landingPublic.CO2'];
  options = [];
  fragment = '';
  color = 'yellow';
  data = [
    {
      icon: 'co2_blue',
      heading1: BusinessSolutionsOption[0],
      heading2: 'landingPublicExplore.ourCarbon',
      heading3: 'landingPublicExplore.youHave',
      yellowBtnNaming: 'landingPublicExplore.try',
      exampleImage: 'offset', // TODO
      router: RoutingTypes.OFFSET,
      checkout: RoutingTypes.OFFSET,
    },
    {
      icon: 'ecommerce_blue',
      heading1: BusinessSolutionsOption[1],
      heading2: 'landingPublicExplore.decarbonise',
      subheading2: 'landingPublicExplore.whether',
      choose: 'landingPublicExplore.choose',
      heading3: 'landingPublicExplore.percentage',
      subheading3: 'landingPublicExplore.setAmount',
      whiteBtnNaming: 'landingPublicExplore.learnMore',
      yellowBtnNaming: 'landingPublicExplore.getStarted',
      exampleImage: 'ecommerce',
      router: RoutingTypes.ECOMMERCE,
      checkout: RoutingTypes.PIONEER_CHECKOUT
    },
    {
      icon: 'blue_climate_positive_subscription',
      heading1: BusinessSolutionsOption[2],
      heading2: 'landingPublicExplore.setUp',
      heading3: 'landingPublicExplore.lead',
      whiteBtnNaming: 'landingPublicExplore.learnMore',
      yellowBtnNaming: 'landingPublicExplore.getStarted',
      exampleImage: 'b2b',
      router: RoutingTypes.BUSINESS_SUBSCRIPTION,
      checkout: RoutingTypes.LEADER_CHECKOUT
    },
    {
      icon: 'gifts_blue',
      heading1: BusinessSolutionsOption[3],
      heading2: 'landingPublicExplore.would',
      heading3: 'landingPublicExplore.treat',
      yellowBtnNaming: 'landingPublicExplore.takeMe',
      exampleImage: 'gifts',
      router: RoutingTypes.GIFT,
      checkout: RoutingTypes.GIFT,
    },
    {
      icon: 'invest_blue',
      heading1: BusinessSolutionsOption[4],
      heading2: 'landingPublicExplore.choosePortfolio',
      heading3: 'landingPublicExplore.finance',
      yellowBtnNaming: 'landingPublicExplore.invest',
      exampleImage: 'project',
      router: RoutingTypes.PROJECTS_PUBLIC,
      checkout: RoutingTypes.PROJECTS_PUBLIC,
    },
    {
      icon: 'green_nft_blue',
      heading1: BusinessSolutionsOption[5],
      heading2: 'landingPublicExplore.areYou',
      subheading2: 'landingPublicExplore.ourPlugIn',
      heading3: 'landingPublicExplore.contactUs',
      whiteBtnNaming: 'landingPublicExplore.learnMore',
      yellowBtnNaming: 'landingPublicExplore.contact',
      exampleImage: 'nft',
      router: RoutingTypes.NFT,
      checkout: RoutingTypes.CONTACT
    },

  ];
  dataB2C = [
    {
      icon: 'blue_monthly_climate_subscription',
      heading1: IndividualSolutionsOption[0],
      heading2: 'landingPublicExplore.select',
      heading3: 'landingPublicExplore.impactful',
      whiteBtnNaming: 'landingPublicExplore.learnMore',
      yellowBtnNaming: 'landingPublicExplore.getStarted',
      exampleImage: 'monthly',
      router: RoutingTypes.INDIVIDUAL_SUBSCRIPTION,
      checkout: RoutingTypes.INDIVIDUAL_SUBSCRIPTION_CHECKOUT
    },
    {
      icon: 'gifts_blue',
      heading1: IndividualSolutionsOption[1],
      heading2: 'landingPublicExplore.would',
      heading3: 'landingPublicExplore.treatB2C',
      yellowBtnNaming: 'landingPublicExplore.takeMe',
      exampleImage: 'gifts',
      router: RoutingTypes.GIFT,
      checkout: RoutingTypes.GIFT
    },
    // {
    //   icon: 'crowdfunding_blue',
    //   heading1: IndividualSolutionsOption[2],
    //   heading2: 'landingPublicExplore.finance',
    //   heading3: '',
    //   yellowBtnNaming: 'landingPublicExplore.invest',
    //   exampleImage: 'project',
    //   router: RoutingTypes.PROJECTS_PUBLIC,
    // },
    {
      icon: 'green_nft_blue',
      heading1: IndividualSolutionsOption[2],
      heading2: 'landingPublicExplore.areYou',
      subheading2: 'landingPublicExplore.ourPlugIn',
      heading3: 'landingPublicExplore.contactUs',
      whiteBtnNaming: 'landingPublicExplore.learnMore',
      yellowBtnNaming: 'landingPublicExplore.contact',
      exampleImage: 'nft',
      router: RoutingTypes.NFT,
      checkout: RoutingTypes.CONTACT
    },
    {
      icon: 'co2_blue',
      heading1: IndividualSolutionsOption[3],
      heading2: 'landingPublicExplore.ourCarbon',
      heading3: 'landingPublicExplore.youHave',
      yellowBtnNaming: 'landingPublicExplore.try',
      exampleImage: 'offset',
      router: RoutingTypes.OFFSET,
      checkout: RoutingTypes.OFFSET
    },
  ];
  selectedData: {
    icon: string,
    heading1: string,
    heading2: string,
    subheading2?: string,
    heading3: string,
    subheading3?: string,
    whiteBtnNaming?: string,
    yellowBtnNaming?: string,
    exampleImage: string,
    router?: string,
    checkout?: string
  }

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (!this.business) {
      this.data = this.dataB2C;
      this.color = 'lime';
      this.BusinessSolutionsOption = IndividualSolutionsOption;
      this.selectedOption = IndividualSolutionsOption['landingPublic.Individual']
    }
    this.selectedData = this.data[0];
    this.createOption();
  }

  private createOption(): void {
    for (const key in this.BusinessSolutionsOption) {
      if (!isNaN(Number(key))) {
        this.options.push(this.BusinessSolutionsOption[key])
      }
    }
  }

  selectOption(item: string): void {
    this.selectedOption = this.BusinessSolutionsOption[item];
    this.selectedData = this.data[this.BusinessSolutionsOption[item]];
    this.fragment = this.selectedData.exampleImage === 'nft' ? 'contact-form' : '';
  }
}

enum BusinessSolutionsOption {
  'landingPublic.CO2' = 0,
  'landingPublic.Ecommerce'= 1,
  'landingPublic.Corporate' = 2,
  'landingPublic.Gifts' = 3,
  'landingPublic.Invest' = 4,
  'landingPublic.Green' = 5
}

enum IndividualSolutionsOption {
  'landingPublic.Individual' = 0,
  'landingPublic.Gifts'= 1,
  // 'landingPublic.Projects' = 2,
  'landingPublic.Green' = 2,
  'landingPublic.CO2' = 3
}
