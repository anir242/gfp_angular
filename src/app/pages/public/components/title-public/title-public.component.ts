import {Component, HostListener, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';
import {RoutingTypes} from '../../../../_models/components/routing-types';

@Component({
  selector: 'app-title-public',
  templateUrl: './title-public.component.html',
  styleUrls: ['./title-public.component.scss']
})
export class TitlePublicComponent extends BaseComponent implements OnInit {
  @Input() arrow: string;
  @Input() button: any;
  @Input() business: boolean;
  routingTypes = RoutingTypes;
  windowWidth:any = window.innerWidth
  lang:string
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang')
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;   
  }

  scrollTo(el: HTMLElement, id: string) {
    if (el) {
      el.scrollIntoView();
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView();
      }
    }
  }

  scrollToId(id: string): void {
    if (id) {
      const yOffset = -56;
      const element = document.getElementById(id);
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }

  routeToCalendly(): void {
    this.identify('Book_demo_website', 'Hubspot');
    window.open(
      'https://page.greenfutureproject.com/meeting-website',
      '_blank'
    );
  }
}
