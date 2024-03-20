import {Injectable} from '@angular/core';
import {ProjectsInterface} from '../../_models/api/projects/projects-interface';
import {CountersDataInterface} from '../../_models/api/counters-data-interface';

@Injectable({
  providedIn: 'root'
})
export class SharedDataProjectService {
  project: ProjectsInterface;
  counters: CountersDataInterface;
  constructor() {
  }
}
