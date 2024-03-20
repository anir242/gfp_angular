export interface SingleFaqInterface {
  id: string;
  title: string;
  title_it: string;
  content: string;
  content_it: string;
  createdById: string;
  sectionId: string;
  order: number;
  priority: boolean;
  createdAt: Date;
  updatedAt: Date;
  faqs?: SingleFaqInterface[]
}
