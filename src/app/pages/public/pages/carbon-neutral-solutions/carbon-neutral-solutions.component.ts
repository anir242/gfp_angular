import { Component, HostListener, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/pages/_base/base/base.component';

@Component({
  selector: 'app-carbon-neutral-solutions',
  templateUrl: './carbon-neutral-solutions.component.html',
  styleUrls: ['./carbon-neutral-solutions.component.scss']
})
export class CarbonNeutralSolutionsComponent extends BaseComponent implements OnInit {

  lang: any = 'en'
  windowHeight:any
  windowWidth:any = window.innerWidth


  constructor() { 
    super()
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') 
    if(this.lang == 'it'){
      window.history.pushState({},null,'/soluzioni_carbon_neutral')
    } else if(this.lang == 'en'){
      window.history.pushState({},null,'/carbon_neutral_solutions')
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) { 
    // Code to handle window position changes
   this.windowHeight = window.scrollY;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  scrollToId(id: string): void {
    if (id) {
      const yOffset = -56;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  openMeet(): void{
    window.open('https://page.greenfutureproject.com/meeting-website')
  }

}
