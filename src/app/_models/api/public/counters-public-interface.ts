import { CountersDataInterface } from '../counters-data-interface';

export interface CountersPublicInterface {
  renewable_energy?: CountersDataInterface;
  preservation?: CountersDataInterface;
  restoration?: CountersDataInterface;
  marine_restoration?: CountersDataInterface;
  tonnes?: CountersDataInterface;
  co2?: number;
  co2Str?: string;
  certifiedStr?: string;
  scienceBackedStr?: string;
}
