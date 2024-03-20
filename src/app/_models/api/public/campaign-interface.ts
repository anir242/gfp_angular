import {ImagesInterface} from '../images-interface';

export interface CampaignInterface {
  id: string;
  title: string;
  title_it: string;
  campaignBrief: string;
  campaignBrief_it: string;
  impact: string;
  impact_it: string;
  theme: string;
  theme_it: string;
  activation: string;
  activation_it: string;
  activationDescription: string;
  activationDescription_it: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  image: ImagesInterface;
}
