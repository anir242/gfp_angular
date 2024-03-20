interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'googleTagManager', src: '../../../assets/js/google-tag-manager.js'},
  { name: 'googleTranslateInit', src: '../../../assets/js/google-translate.js' },
  { name: 'googleTranslate', src: 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' },
  { name: 'googleMaps', src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyALzgExPeUIi37zph5Z2z_ykUtYpg9I_r4'},
  { name: 'modelViewer', src: 'https://unpkg.com/@google/model-viewer@2.1.1/dist/model-viewer.min.js'},
  { name: 'bootstrap', src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'},
  { name: 'facebook', src: '../../../assets/js/facebook.js'},
  { name: 'linkedin', src: '../../../assets/js/linkedin.js'},
  { name: 'hotjar', src: '../../../assets/js/hotjar.js'},
  { name: 'hubspot', src: '../../../assets/js/hubspot.js'},
  { name: 'privacyPolicy', src: '../../../assets/js/privacy-policy.js'},
  { name: 'cookiePolicy', src: '../../../assets/js/cookie-policy.js'},
  { name: 'termsConditions', src: '../../../assets/js/terms-conditions.js'},
];
