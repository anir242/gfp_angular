import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-offset',
  templateUrl: './provider-offset.component.html',
  styleUrls: ['./provider-offset.component.scss']
})
export class ProviderOffsetComponent implements OnInit {

  data = [
    {
      id: 1,
      isSelected: true,
      name: 'Invest Conservation',
      image: '/assets/images/public/providers/invest-conservation.png'
    },
    {
      id: 2,
      isSelected: false,
      name: 'Carbon Verra',
      image: '/assets/images/public/providers/carbon-verra.png'
    },
    {
      id: 3,
      isSelected: false,
      name: 'Gold Standard',
      image: '/assets/images/public/providers/gold-standard.png'
    },
  ]
  selectedData: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
