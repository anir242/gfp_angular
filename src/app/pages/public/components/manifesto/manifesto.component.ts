import { BreakpointObserver } from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../_base/base/base.component';

@Component({
  selector: 'app-manifesto',
  templateUrl: './manifesto.component.html',
  styleUrls: ['./manifesto.component.scss']
})
export class ManifestoComponent extends BaseComponent implements OnInit {
  isSmallScreen: boolean;

  items = [{
    title: this.translate.instant('aboutPublic.simplify'),
    description: this.translate.instant('aboutPublic.simplifyDescription'),
    icon: 'simplify',
    isExpand: false,
  },
  {
    title: this.translate.instant('aboutPublic.changing'),
    description: this.translate.instant('aboutPublic.changingDescription'),
    icon: 'changing',
    isExpand: false,
  },
  {
    title: this.translate.instant('aboutPublic.making'),
    description: this.translate.instant('aboutPublic.makingDescription'),
    icon: 'making',
    isExpand: false,
  },
  {
    title: this.translate.instant('aboutPublic.responsibility'),
    description: this.translate.instant('aboutPublic.responsibilityDescription'),
    icon: 'responsibility',
    isExpand: false,
  }];

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 991px)');
  }

  sliceFirstTenWords(essay: string): string {
    return essay.split(' ').slice(0, 10).join(' ');
  }

}
