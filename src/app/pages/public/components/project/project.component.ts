import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit,HostListener } from '@angular/core';
import { ProjectTypologyService } from 'src/app/_services/public/project-typology.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  maxWidth = '(max-width: 768px)';
  minWidth = '(min-width: 767px)';
  cardWidth: number;
  carouselHeight: number;
  toggleProperty = false;
  cellsToShow: number;
  isArrowsOutside: boolean;
  data;
  selectedLang = localStorage.getItem('lang');
  isLargeScreen: boolean;
  @Input() business: boolean;
  windowWidth:any = window.innerWidth


  constructor(
    private breakpointObserver: BreakpointObserver,
    private projectsTypology: ProjectTypologyService,
  ) { }

  ngOnInit(): void {
    this.cardMeasures();
    this.getData();
    this.isLargeScreen = this.breakpointObserver.isMatched('(max-width: 1399px)');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;   
  }

  setLang(): void {
    const selectedLang = localStorage.getItem('lang');
    if (selectedLang == 'it') {
      this.data.forEach(projectType => {
        projectType.name = projectType.name_it;
        projectType.description = projectType.description_it;
      });
    }
  }

  getData(): void {
    this.projectsTypology.getProjectTypes()
      .then((res: any) => {
        this.data = res.data;
        this.setLang();
      });
  }

  private cardMeasures(): void {
    this.breakpointObserver.observe([
      this.minWidth,
      this.maxWidth,
    ]).subscribe(result => {

      this.carouselHeight = 465;
      if (result.breakpoints[this.minWidth]) {
        this.cardWidth = 309;
        this.cellsToShow = 0;
      } else {
        this.cardWidth = 268;
        this.cellsToShow = 1;
      }
    });
  }
}
