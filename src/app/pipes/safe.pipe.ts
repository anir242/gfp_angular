import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 