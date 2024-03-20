import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactCategories } from 'src/app/_models/components/form-options';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent extends BaseComponent implements OnInit {

  isMobile : boolean;
  defaultInput = '';
  optionsCategory = ContactCategories;
  widthCards: number;
  cellToShow: number;

  array:any [] = [];

  articleList:any[]= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; //list of temp elements

  articlePerPage: number = 8;
  public selectedPage = 1;

  form = new UntypedFormGroup({
    category: new UntypedFormControl(null),
    searchInput : new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
  });

  constructor(private breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    let pageIndex = (this.selectedPage - 1) * this.articlePerPage;
    this.array = this.articleList.slice(pageIndex, this.articlePerPage);
    this.cardMeasure();
  }

  get searchInput(): UntypedFormControl {
    return this.form.get('searchInput') as UntypedFormControl;
  }

  get category(): UntypedFormControl {
    return this.form.get('category') as UntypedFormControl;
  }

  readMore(title: string): void {
  }

  //Pagination

  get pageNumbers(): number[]{
    return Array(Math.ceil(this.articleList.length / this.articlePerPage))
    .fill(0).map((x,i) => i+1);
  }

  changePage(page : any, element: HTMLElement){
    this.selectedPage = page;
    this.slicedProducts();
    element.scrollIntoView({behavior: 'smooth'});
  }

  slicedProducts(){
    let pageIndex = (this.selectedPage -1) * this.articlePerPage;
    let endIndex = (this.selectedPage -1) * this.articlePerPage + this.articlePerPage;
    this.array = [];
    this.array = this.articleList.slice(pageIndex, endIndex);
  }

  cardMeasure() : number{
    switch(this.pageNumbers.length){
      case 1:
        this.widthCards = 40;
        this.cellToShow = 1;
        break;
      case 2:
        this.widthCards = 90;
        this.cellToShow = 2;
        break;
      case 3:
        this.widthCards = 180;
        this.cellToShow = 3;
        break;
      default:
        this.widthCards = 200;
        this.cellToShow = 4;
        break;
    }
    return this.widthCards;
  }

  //end Pagination
}
