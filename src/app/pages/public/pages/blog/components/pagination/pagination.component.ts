import { BreakpointObserver } from '@angular/cdk/layout';
import {Component, Input, OnInit, Output} from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent{

  @Input() itemsList:any[]; //list of elements

  @Input() itemsPerPage: number;  //number of items per page

  // @Output() itemsChange = new EventEmitter(); // not works... testing

  public selectedPage = 1;

  items:any[] = [];

  constructor() {}

  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.itemsPerPage;
    this.items = this.itemsList.slice(pageIndex, this.itemsPerPage);
  }

  get pageNumbers(): number[]{
    return Array(Math.ceil(this.itemsList.length / this.itemsPerPage))
    .fill(0).map((x,i) => i+1);
  }

  changePage(page : any){
    this.selectedPage = page;
    this.slicedProducts();
  }

  slicedProducts(){
    let pageIndex = (this.selectedPage -1) * this.itemsPerPage;
    let endIndex = (this.selectedPage -1) * this.itemsPerPage + this.itemsPerPage;
    this.items = [];
    this.items = this.itemsList.slice(pageIndex, endIndex);
  }
}
