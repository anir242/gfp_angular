export interface BillingAddressInterface {
  country: string;
  sdi: string;
  city: string;
  streetHouse: string;
  apartment: string;
  zip: string;
  vatNumber?: string;
  companyName?: string;
  pec?: string;
}
