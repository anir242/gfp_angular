import {SingleFaqInterface} from './single-faq-interface';

export interface FaqInterface {
  id: string;
  title: string;
  title_it: string;
  order: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  faqs: SingleFaqInterface[];
}
