import { Component, HostListener, OnInit } from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import { element } from 'protractor';
import { AnyAaaaRecord } from 'dns';

@Component({
  selector: 'app-carbon-footprint-management',
  templateUrl: './carbon-footprint-management.component.html',
  styleUrls: ['./carbon-footprint-management.component.scss']
})
export class CarbonFootprintManagementComponent extends BaseComponent implements OnInit {
  graphic: string = 'Graphic';
  module: string = 'Laptop';
  moduleIndex: number;
  windowWidth:any = window.innerWidth
  isOpenedScope = {
    ms1: false,
    ms2: false,
    ms3: false
  }
  isOpenedLaptop = {
    ml0: false,
    ml1: false,
    ml2: false
  }


  tabData: any[] = [
    {
      tabName: 'WBSC',
      logo: '../../../../../assets/images/emission/icons/wbsc.svg',
      title1: 'pilioPage.industry',
      description1: 'pilioPage.sports',
      title2: 'pilioPage.starting',
      description2: 'pilioPage.theWbsc',
      title3: 'pilioPage.solution',
      description3: 'pilioPage.the2022',
      co2: '214.77 t',
      restoration:'3,250',
      preservation:'2,925 m²',
      renewable: '258,375 KWh',
      img:'../../../../../assets/images/pilio/images/WBSC.png'
    },
    {
      tabName: 'E-GAP',
      logo: '../../../../../assets/images/emission/icons/E-GAP.svg',
      title1: 'pilioPage.industry',
      description1: 'pilioPage.electric',
      title2: 'pilioPage.starting',
      description2: "pilioPage.createdThrough",
      title3: 'pilioPage.solution',
      description3: 'pilioPage.through',
      co2: '923.49 t',
      restoration:'14,299',
      preservation:'1.33 acres',
      renewable: '987,705 KWh',
      img:'../../../../../assets/images/pilio/images/E-GAP.png'
    },
    {
      tabName: 'LDP',
      logo: '../../../../../assets/images/emission/icons/LDP.svg',
      title1: 'pilioPage.industry',
      description1: 'pilioPage.taxAndLaw',
      title2: 'pilioPage.starting',
      description2: 'pilioPage.ldp',
      title3: 'pilioPage.solution',
      description3: 'pilioPage.ldpCarbon',
      co2: '54.86 t',
      restoration:'250',
      preservation:'1,000 m²',
      marine: '20',
      img:'../../../../../assets/images/pilio/images/LDP.png'
    },
  ]

  laptopLinks:string[] = [
    'Energy Health Check',
    'Energy Management Module',
    'Carbon Footprint Module',
  ]

  modules:any[] = [
    ['energyHealthCheck', 'startingPoint','tryItNow','open'],
    ['energyManagement', 'monitorAndManage','findOutMore','scroll'],
    ['carbonFootprint', 'calculateYourCompany','unlock','scroll']
  ]

  carbonReasons:any[] = [
    {'icon': 'Ruler', 'text1': 'ifYouCant', 'text2': 'ifYouDont'},
    {'icon': 'Rise', 'text1': 'reputationAndCompetitive', 'text2': 'attentionTo'},
    {'icon': 'dont', 'text1': 'complyWith', 'text2': 'Measuring'},
    {'icon': 'pig', 'text1': 'lessCosts', 'text2': 'byQuantifying'},
    {'icon': 'Product growth', 'text1': 'integrating', 'text2': 'companies'},
  ]


  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.router.url == '/carbon_footprint_management' && localStorage.lang === 'it') {
      localStorage.setItem('lang', 'en');
      location.reload();
    } else if (this.router.url == '/gestione_impronta_carbonio' && localStorage.lang === 'en') {
      localStorage.setItem('lang', 'it');
      location.reload();
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }
  laptopChange(id){
    this.module = this.laptopLinks[id];
    this.moduleIndex = id;
  }

  laptopLeave(){
    this.module = 'Laptop';
    this.moduleIndex = null;
  } 

  scopesEnter(id:number){  
      if(id == 1){
    document.getElementById('graphic').style.backgroundImage = `url('assets/images/pilio/images/Graphic - Scope 1.png')`
      }else if(id == 2){
    document.getElementById('graphic').style.backgroundImage = `url('assets/images/pilio/images/Graphic - Scope 2.png')`
      }else{
    document.getElementById('graphic').style.backgroundImage = `url('assets/images/pilio/images/Graphic - Scope 3.png')`
      }
  }

  scopesLeave(){
    document.getElementById('graphic').style.backgroundImage = `url('assets/images/pilio/images/Graphic.png')`
  }

  scrollToId(id: string, h?:number): void {
    if (id) {
      const yOffset = 0;
      const element = document.getElementById(id);
      const y = h ? element.getBoundingClientRect().top + window.scrollY + yOffset - h :element.getBoundingClientRect().top + window.scrollY + yOffset ;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  openMeet(): void{
    window.open('https://gfp-energyhealthcheck.piliogroup.com')
  }

  openBlog(link): void{
    window.open(link)
  }

  show(id):void{
    for (const i in this.isOpenedScope) {
          if(i !== id){
          this.isOpenedScope[i] = false
          }
    }
    this.isOpenedScope[id] = !this.isOpenedScope[id]   
  }

  showLaptop(id):void{
    for (const i in this.isOpenedLaptop) {
      if(i !== id){
      this.isOpenedLaptop[i] = false
      }
}
    this.isOpenedLaptop[id] = !this.isOpenedLaptop[id]   
  }

}
