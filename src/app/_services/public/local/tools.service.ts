import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  data = [
    {
      title: 'tools.title1',
      caption: "tools.description1",
      icon: "manage-impact"
    },
    {
      title: "tools.title2",
      caption: "tools.description2",
      icon: "show-impact"
    },
    {
      title: 'tools.title3',
      caption: "tools.description3",
      icon: "live-experience"
    },
    {
      title: 'tools.title4',
      caption: "tools.description4",
      icon: "collect-ecosystems"
    }
  ]

  dataB2C = [
    {
      title: 'tools.title5',
      caption: "tools.description5",
      icon: "show-impact"
    },
    {
      title: 'tools.title3',
      caption: "tools.description3",
      icon: "live-experience"
    },
    {
      title: 'tools.title4',
      caption: "tools.description4",
      icon: "collect-ecosystems"
    },
    
  ]

  constructor() { }

  getData(): Observable<any> {
    return of(this.data);
  }

  getDataB2C(): Observable<any> {
    return of(this.dataB2C);
  }
}
