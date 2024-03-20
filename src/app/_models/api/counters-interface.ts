import {CountersDataInterface} from './counters-data-interface';

export interface CountersInterface {
  date?: string;
  renewable_energy?: CountersDataInterface;
  preservation?: CountersDataInterface;
  restoration?: CountersDataInterface;
  marine_restoration?: CountersDataInterface;
  tonnes?: CountersDataInterface;
}
