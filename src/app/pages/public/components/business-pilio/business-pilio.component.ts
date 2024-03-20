import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-pilio',
  templateUrl: './business-pilio.component.html',
  styleUrls: ['./business-pilio.component.scss']
})
export class BusinessPilioComponent implements OnInit {

  colors: any[] = ['#d07000', '#128e9c', '#2d8975', '#659b02', '#00734F']
  lang: any = 'en'
  openModal: boolean = false
  isOpened:boolean = false
  windowWidth:any = window.innerWidth

  data: any[] = [
    {
      type: 'comunicate',
      name: 'businessSolutions.communicate.communicate2',
      title: 'businessSolutions.communicate.employees',
      button: 'businessSolutions.communicate.findOutMore',
      url:"/#contact-form",
      url_it:"/#contact-form",
      subtitle: 'businessSolutions.communicate.showcaseAspects',
      cards: [
        {
          img: '../../../../../assets/images/pilio/images/communicate1.png',
          title: 'businessSolutions.clickedCommunicate.climateImpact',
          text: 'businessSolutions.clickedCommunicate.addCustomized'
        },
        {
          img: '../../../../../assets/images/pilio/images/communicate2.png',
          title: 'businessSolutions.clickedCommunicate.MakeAchievements',
          text: 'businessSolutions.clickedCommunicate.treePlanting'
        },
        {
          img: '../../../../../assets/images/pilio/images/communicate3.png',
          title: 'businessSolutions.clickedCommunicate.partnerMedia',
          text: 'businessSolutions.clickedCommunicate.interactivePartner'
        }
      ]
    },
    {
      type: 'measure',
      name: 'businessSolutions.measure.measure3',
      title: 'businessSolutions.measure.energy',
      subtitle: 'businessSolutions.measure.measureYourScope',
      cards: [
        {
          img: '../../../../../assets/images/pilio/images/measure1.png',
          title: 'businessSolutions.clickedMeasure.energyHealth',
          url: '/carbon_footprint_management',
          url_it: '/gestione_impronta_carbonio',
          text: 'businessSolutions.clickedMeasure.theStarting',
          button: 'businessSolutions.clickedMeasure.tryNow',
          buttonType: 'raised'
        },
        {
          img: '../../../../../assets/images/pilio/images/measure2.png',
          title: 'businessSolutions.clickedMeasure.energyManagement',
          url: '/carbon_footprint_management',
          url_it: '/gestione_impronta_carbonio',
          text: 'businessSolutions.clickedMeasure.monitorAndManage',
          button: 'businessSolutions.clickedMeasure.findOutMore',
          buttonType: 'stroked'
        },
        {
          img: '../../../../../assets/images/pilio/images/measure3.png',
          title: 'businessSolutions.clickedMeasure.carbonFootprint',
          url: '/carbon_footprint_management',
          url_it: '/gestione_impronta_carbonio',
          text: 'businessSolutions.clickedMeasure.calculateFootprint',
          button: 'businessSolutions.clickedMeasure.discover',
          buttonType: 'stroked'
        }
      ]
    },
    {
      type: 'track',
      name: 'businessSolutions.track.track2',
      button: 'businessSolutions.track.bookDemo',
      url: 'https://page.greenfutureproject.com/meeting-website',
      url_it: 'https://page.greenfutureproject.com/meeting-website',
      title: 'businessSolutions.track.climateImpact',
      subtitle: "businessSolutions.track.trackReport",
      img: '../../../../../assets/images/pilio/images/track1.svg'
    },
    {
      type: 'offset',
      name: 'businessSolutions.offset.offset2',
      title: 'businessSolutions.offset.topInClass',
      subtitle: 'businessSolutions.offset.fromCertified',
      cards: [
        {
          img: '../../../../../assets/images/pilio/images/offset1.png',
          title: 'businessSolutions.clickedOffset.co2Offset',
          text: 'businessSolutions.clickedOffset.ourTool',
          url: '/offset/checkout',
          url_it: '/offset/checkout',
          button: 'businessSolutions.clickedOffset.purchase',
          buttonType: 'raised',
          icon: '../../../../../assets/images/pilio/icons/offset-icon1.svg'
        },
        {
          img: '../../../../../assets/images/pilio/images/offset2.png',
          title: 'businessSolutions.clickedOffset.ecommerce',
          text: 'businessSolutions.clickedOffset.goBeyond',
          url: '/api',
          url_it: '/api',
          button: 'businessSolutions.clickedOffset.learnMore',
          buttonType: 'stroked',
          icon: '../../../../../assets/images/pilio/icons/offset-icon2.svg'
        },
        {
          img: '../../../../../assets/images/pilio/images/offset3.png',
          title: 'businessSolutions.clickedOffset.climatePositive',
          text: 'businessSolutions.clickedOffset.demonstrate',
          url: '/climatePositiveSubscription',
          url_it: '/climatePositiveSubscription',
          button: 'businessSolutions.clickedOffset.learnMore',
          buttonType: 'raised',
          icon: '../../../../../assets/images/pilio/icons/offset-icon3.svg'
        }
      ]
    },
    {
      type: 'esg',
      name: 'businessSolutions.esg.esg',
      button: 'businessSolutions.esg.findOutMore',
      title: 'businessSolutions.esg.tailored',
      subtitle: 'businessSolutions.clickedEsg.support',
      cards: [
        {
      img: '../../../../../assets/images/pilio/images/esg1.png',
          title: 'businessSolutions.clickedEsg.carbonFootprint',
          text: 'businessSolutions.clickedEsg.calculating',
          url: '/environmental_sustainability_advisory',
          url_it: '/consulenza_sostenibilita_ambientale',
        },
        {
          img: '../../../../../assets/images/pilio/images/esg2.png',
          title: 'businessSolutions.clickedEsg.lifecycle',
          text: 'businessSolutions.clickedEsg.support',
          url: '/environmental_sustainability_advisory',
          url_it: '/consulenza_sostenibilita_ambientale',
        }
      ]
    },
  ]
  showData: any
  classes:any[]=['position1-h','position2-h','position3-h','position4-h','center-logo-h','center-logo-it-h'] 
  constructor() { }

  ngOnInit(): void {
    this.showData = this.data[0]
    this.lang = localStorage.getItem('lang')
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;   
  }

  mouseEnter(a) {
    document.getElementById(`tab-${a.target.id}`).style.border = `1px solid ${this.colors[a.target.id]}`;
  }

  mouseleave(a) {
    document.getElementById(`tab-${a.target.id}`).style.border = `1px solid transparent`
  }

  openM(id,pos?) {
    if(this.windowWidth < 600){
        if( id ==0){
          //@ts-ignore
    document.getElementById('cards-height').classList.add('cards-height1')
        }else if(id == 3){
           //@ts-ignore
           this.lang == 'it' ? document.getElementById('cards-height').classList.add('cards-height2_it') : document.getElementById('cards-height').classList.add('cards-height2')
        }else if(id == 2){
          //@ts-ignore
          this.lang == 'it' ? document.getElementById('cards-height').classList.add('cards-height3_it') : document.getElementById('cards-height').classList.add('cards-height3')
        }
        else if(id == 1){
          //@ts-ignore
      document.getElementById('cards-height').classList.add('cards-height')
        }else if(id == 4){
          document.getElementById('cards-height').classList.add('cards-height4')
        }
    }
    this.openModal = true
    this.isOpened = true
    this.showData = this.data[id]
    this.classes.forEach(element => {
      let a = document.getElementsByClassName(element)
        for (let i = 0; i < a.length; i++) {
              a[i].classList.remove(`${element}`) 
        }
  });
    if (this.lang == 'it') {
      this.showData.url = this.showData.url_it
    }
    let addedId = pos == 'position1-h' ? 0 : pos == 'position2-h' ? 1: pos == 'position3-h' ? 2: pos == 'position4-h'? 3 : 4
    let elem = document.getElementById(`${addedId}`)
    elem.classList.add(`${pos}`) 
    
    this.scrollToId('business-modal')
  }
  closeM() {
    document.getElementById('cards-height').classList.remove('cards-height1','cards-height','cards-height2','cards-height3', 'cards-height4','cards-height3_it','cards-height2_it')
    this.openModal = false
    this.isOpened = false
    this.classes.forEach(element => {
        let a = document.getElementsByClassName(element)
          for (let i = 0; i < a.length; i++) {
                a[i].classList.remove(`${element}`) 
          }
    });
    this.scrollToId('pilio-circle')
  }

  openMeet(): void{
    window.open('https://page.greenfutureproject.com/meeting-website')
  }

  scrollToId(id: string): void {
    if (id) {
      const yOffset = -56;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  // changeStyle(clickedElement: HTMLElement):void{
  //   console.log(clickedElement);
  //   clickedElement.classList.toggle('hovered-card')
  // }

  reloadPage(): void {
    setTimeout(() => {
        location.reload()
    }, 300);
  }

}
