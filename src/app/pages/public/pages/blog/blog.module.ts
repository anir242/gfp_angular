import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../../_modules/shared/shared.module';
import {PublicSharedModule} from '../../modules/public-shared/public-shared.module';
import {BlogRoutingModule} from './blog-routing.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {BlogComponent} from './pages/blog/blog.component';
import {ArticleComponent} from './pages/article/article.component';
import {BlogListItemComponent} from './components/blog-list-item/blog-list-item.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent,
    BlogListItemComponent,
    PaginationComponent,],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    PublicSharedModule,
    BlogRoutingModule,
    MatGridListModule
  ]
})
export class BlogModule {
}
