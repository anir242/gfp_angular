// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://devapi.greenfutureproject.com:9443/api',
  authApiUrl: 'https://devapi.greenfutureproject.com:9443/api',
  publicApiUrl: 'https://devapi.greenfutureproject.com:9443/api',

  //apiUrl: 'http://localhost:5666/api',
  //authApiUrl: 'http://localhost:5666/api',
  //publicApiUrl: 'http://localhost:5666/api',

  //apiUrl: 'https://api.greenfutureproject.com:8443/api',
  //authApiUrl: 'https://api.greenfutureproject.com:8443/api',
  //publicApiUrl: 'https://api.greenfutureproject.com:8443/api',

  loginApiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiR2F0ZURldiIsInByb2plY3QiOiJHcmVlbiBGdXR1cmUgUHJvamVjdCIsImlkIjotMjIwNywiaWF0IjoxNTE2MjM5MDIyfQ.KdsT7Ld2mwvu6VCMl-u7G4KBrSpEnyUKpDq7xemdIHg',
  publicApiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiR2F0ZURldiIsInByb2plY3QiOiJHcmVlbiBGdXR1cmUgUHJvamVjdCIsInNpdGUiOiJwdWJsaWMiLCJpZCI6LTIyMDcsImlhdCI6MTUxNjIzOTAyMn0.Dm3v1gqv-PrClFKyW95_Ce0ODXlEuggRdWr9u24GFB8',

  stripePublicKey: 'pk_test_51HUZX9I73UjfvGcAVvqo27CoP5pchmL3K0hd4JPdseqc8ixyfP154uQMhDaVf17W92uB00176fFSOQtrai6Ll1H700roxkYWmP',

  facebookClientId: '1921669641329613',
  googleClientId: '340585749385-vn0deamo33rbtk9g76llr2npmbco37oa.apps.googleusercontent.com',
  googleMapsApiKey: 'AIzaSyCPvWcDnE0FeJNg1rdP_IE7tHF9kwHbBeE',
  googleTagManagerId: 'GTM-TJB4F6S',
  moosendId: '6787dc81-6492-46d2-b349-49698a8d8de3',
  moosendList: '25dd5bc4-cef8-44cd-bce6-d9b77cb7b01c',
  moosendListB2C: '3f1d3617-7652-4b6c-a72c-ce797f791235',
  moosendListB2B: '3b096a68-78a1-4ce2-8c74-effc787caee8',
  openWeatherKey: '0b542c3b123e7eb980fe56200d0682dd',
  hubspotApiKey: 'pat-eu1-97d81e07-d516-4df4-bf24-a0051b6f14f2',
  hubspotPortalId: '27009746',
  hubspotBusinessFormId: 'f9cfc6ee-ae54-4d4b-bcfc-17d02b79be49',
  hubspotIndividualFormId: '7dd81f75-8725-462e-b5e8-721337797fb1',
  hubspotApiUrl: 'https://api.hsforms.com/submissions/v3/integration/submit',
  pilioLoginUrl: 'https://test.greenfutureproject.piliogroup.com/users/verify_magic_link',
  url: 'https://devapp.greenfutureproject.com',
  enableImpact: true,
  showSettings: true,
  enableShare: true,
  enableSupport: true,
  showStartNowPlan: true,
  showJoinTeam: true,
  showSubscriptionPlans: true,
  showBusiness: true,
  pixelEnable: false,
  showApi: true,
  showDownloadCard: true,
  showSocialsLogin: true,
  awsBaseUrl: 'https://green-future-project.s3.eu-central-1.amazonaws.com',
  nativaApiFeatureFlag: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// b76546bebdcb8b055a838c38d0219c77
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
