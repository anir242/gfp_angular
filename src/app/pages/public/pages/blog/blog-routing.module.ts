import {ProjectTypeResolver} from '../../../../_services/resolver/project-type.resolver';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BlogComponent} from './pages/blog/blog.component';
import {ArticleComponent} from './pages/article/article.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      breadcrumb: 'breadcrumb.blog'
    },
    title: 'GFP | Blog',
  },
  {
    path: ':slug',
    component: ArticleComponent,
    data: {
      breadcrumb: 'breadcrumb.article'
    },
    title: 'GFP | Blog Article'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
