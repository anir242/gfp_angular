import { BreakpointObserver } from '@angular/cdk/layout';
import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../../_base/base/base.component';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent extends BaseComponent implements OnInit {

  @Input() titleBlog;
  @Input() typeBlog;
  @Input() dateBlog;
  @Input() descBlog;
  @Input() imgBlog;
  @Input() likesBlog;

  isMobile: boolean;

  constructor( private breakpointObserver: BreakpointObserver
  ) {
    super();
  }

  ngOnInit(): void {
    this.isMobile= this.breakpointObserver.isMatched('(max-width: 767px)');
  }

// openArticle = async (slug: string): Promise<void> => {
  openArticle = async (): Promise<void> => {
    await this.router.navigate(['article']);
  }
}
