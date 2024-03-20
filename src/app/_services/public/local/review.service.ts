import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { BaseService } from '../../_base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  private reviewInterface: ReviewInterface[] = [
    {
      date: '17/03/2022',
      logo: '/assets/images/press/tg2.png',
      review: 'Tg2',
      description: 'Tg2 presents Green Future Project',
      linkNaming: 'landingPublicReviews.watch',
      url: 'https://www.youtube.com/watch?v=ZYSjLMAFUUs'
    },
    {
      date: '20/12/2021',
      logo: '/assets/images/press/tedx.png',
      review: 'TedX',
      description: 'Il potere dell’azione collettiva',
      url: 'https://www.youtube.com/watch?v=wYtwcfDT5W8',
      linkNaming: 'landingPublicReviews.watch'
    },
    {
      date: '09/08/2022',
      logo: '/assets/images/press/review/Corriere.png',
      review: 'Corriere',
      description: 'Piattaforma green italiana per crediti di carbonio garantiti da blockchain',
      url: 'https://www.corriere.it/economia/aziende/22_agosto_09/piattaforma-green-italiana-crediti-carbonio-garantiti-blockchain-df46ff4e-1726-11ed-b75e-23db5ddc9f20.shtml',
      linkNaming: 'landingPublicReviews.read'
    },
    {
      date: '20/03/2022',
      logo: '/assets/images/press/startup-italia.png',
      review: 'Startup Italia',
      description: 'La startup E-Gap pianterà mangrovie e proteggerà la foresta tropicale a ogni ricarica',
      linkNaming: 'landingPublicReviews.watch',
      url: 'https://startupitalia.eu/79699-20220321-la-startup-e-gap-piantera-mangrovie-e-proteggera-la-foresta-tropicale-a-ogni-ricarica'
    },
    {
      date: '09/08/2022',
      logo: '/assets/images/press/review/Tech Princess.png',
      review: 'Tech Princess',
      url: 'https://techprincess.it/green-future-project/',
      linkNaming: 'landingPublicReviews.watch'
    },
    {
      date: '09/08/2022',
      logo: '/assets/images/press/vanity-fair.png',
      review: 'Vanity Fair',
      linkNaming: 'landingPublicReviews.read',
      url: 'https://www.vanityfair.it/news/approfondimenti/2021/04/06/vanity-fair-green-from-challenge-to-change-sostenibilita'
    }
  ]; // TODO: replace it with data returned from API.

  constructor() {}

  getReviews(): Observable<ReviewInterface[]> {
    return of(this.reviewInterface);
  }

  // getReviews = async () => {
  //   return await this.http.get(`${environment.publicApiUrl}/public/press`, {
  //     headers: this.getPublicRequestHeaders(),
  //   }).toPromise();
  // }

}

export interface ReviewInterface {
  date: string;
  logo: string;
  review: string;
  description?: string;
  linkNaming: string;
  url: string;
}
