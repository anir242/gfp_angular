import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() latitude;
  @Input() longitude;
  @Input() dynamic?: 'none' | 'cooperative' = 'none';
  center: google.maps.LatLngLiteral;
  marker: google.maps.Marker;
  options: google.maps.MapOptions;

  constructor() { }

  ngOnInit(): void {
    this.getCoordinates(this.latitude, this.longitude);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getCoordinates(this.latitude, this.longitude);
  }
  getCoordinates = (latitude: any, longitude: any) => {
    this.options = {
      mapTypeId: 'hybrid',
      zoomControl: true,
      scrollwheel: false,
      zoom: 6,
      streetViewControl: false,
      disableDoubleClickZoom: true,
      gestureHandling: this.dynamic,
      keyboardShortcuts: false
    };
    this.center = {
      lat: latitude,
      lng: longitude,
    };
    this.marker = new google.maps.Marker({
      position: this.center
    });
  }
}
