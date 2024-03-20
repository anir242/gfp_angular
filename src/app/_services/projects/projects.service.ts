import {Injectable} from '@angular/core';
import {BaseService} from '../_base/base.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getProjects = async (params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/projects`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }

  getProjectName = async (projectSlug: string) => {
    return await this.http.get(`${environment.authApiUrl}/public/projects/${projectSlug}/name`, {
      headers: this.getPublicRequestHeaders(),
      params: {
        slug: projectSlug
      }
    }).toPromise();
  }
  getProjectBySlug = async (slug: string) => {
    return await this.http.get(`${environment.authApiUrl}/projects/${slug}`, {
      headers: this.getRequestHeaders()
    }).toPromise();
  }

  getProjectStages = async (params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/projectStages`, {
      headers: this.getRequestHeaders(),
      params
    }).toPromise();
  }

  getPublicProjectStages = async (params?: any) => {
    return await this.http.get(`${environment.authApiUrl}/projectStages`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }

  getProjectWeather = async (lat: number, lon: number) => {
    const params = {
      lat, lon
    }
    return await this.http.get(`${environment.authApiUrl}/projects/weather`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }

  getProjectTimeZone = async (lat: number, lon: number, timestamp: number) => {
    const params = {
      lat, lon, timestamp
    }
    return await this.http.get(
      `${environment.authApiUrl}/projects/timezone`, 
      {
        headers: this.getPublicRequestHeaders(),
        params
    }).toPromise();
  }

  getPublicProjects = async (params?: any) => {
    return await this.http.get(`${environment.publicApiUrl}/public/projects`, {
      headers: this.getPublicRequestHeaders(),
      params
    }).toPromise();
  }

  getPublicProjectBySlug = async (slug: string) => {
    return await this.http.get(`${environment.publicApiUrl}/public/projects/${slug}`, {
      headers: this.getPublicRequestHeaders(),
    }).toPromise();
  }
}
