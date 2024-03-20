import {ImagesInterface} from '../images-interface';
import {ProjectsGoalsInterface} from './projects-goals-interface';
import {ProjectsPartnersInterface} from './projects-partners-interface';

export interface ProjectDataInterface {
  id: string;
  projectId: string;
  scope: string;
  scope_it: string;
  scope_jp: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  countryImageId: string;
  overview: string;
  overview_it: string;
  overview_jp: string;
  specialCharacteristics: string;
  specialCharacteristics_it: string;
  specialCharacteristics_jp: string;
  acres: string;
  altitude: string;
  ecosystem: string;
  ecosystem_it: string;
  ecosystem_jp: string;
  problem: string;
  problem_it: string;
  problem_jp: string;
  support: string;
  support_it: string;
  support_jp: string;
  biodiversity: string;
  biodiversity_it: string;
  biodiversity_jp: string;
  biodiversityRating: number;
  absorption: string;
  absorption_it: string;
  absorption_jp: string;
  absorptionRating: number;
  economicDevelopment: string;
  economic_development_it: string;
  economic_development_jp: string;
  economicDevelopmentRating: number;
  languageCode: string;
  status: string;
  createdById: string;
  updatedById: string;
  createdAt: Date;
  updatedAt: Date;
  birdSpecies: number;
  mammalSpecies: number;
  amphibianSpecies: number;
  reportUrl?: any;
  goals?: ProjectsGoalsInterface[];
  partners?: ProjectsPartnersInterface;
  countryImage?: ImagesInterface;
}