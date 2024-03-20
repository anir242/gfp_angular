import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {ProjectsService} from '../projects/projects.service';
import {Response} from '../../_models/api/response';

@Injectable({
  providedIn: 'root'
})
export class ProjectsResolver implements Resolve<string> {

  constructor(private projectService: ProjectsService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    try {
      const id = route.params.slug;
      const response: Response<any> = await this.projectService.getProjectName(id);
      if (response?.success) {
        return response.data.name;
      }
    } catch (e) {
    }
    return '';
  }
}
