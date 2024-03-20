import { Component, OnInit} from '@angular/core';
import {ModelViewerElement} from '@google/model-viewer/lib/model-viewer';

@Component({
  selector: 'app-stages',
  template: '',
})
export class StagesComponent {

  constructor() { }

  clickHotspot(event): void {
    const modelViewer: ModelViewerElement = event.parentNode;
    const hotspot = event.getElementsByClassName('HotspotAnnotation')[0];
    if (hotspot !== undefined){
      if (hotspot.classList.value.includes('active')){
        hotspot.classList.remove('active');
        modelViewer.autoRotate = true;
      }else{
        const hotspots = modelViewer.getElementsByClassName('HotspotAnnotation');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < hotspots.length; i++){
          if (hotspots[i].classList.value.includes('active')){
            hotspots[i].classList.remove('active');
          }
        }
        hotspot.classList.add('active');
        modelViewer.autoRotate = false;
      }
    }
  }
}
