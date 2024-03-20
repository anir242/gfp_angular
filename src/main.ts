import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import * as Sentry from "@sentry/angular";
// import { BrowserTracing } from "@sentry/tracing";
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Sentry.init({
//   dsn: "https://5a91b908ef774e478fe6d7a5f1fbe0a4@o1087432.ingest.sentry.io/6100867",
//   integrations: [
//     new BrowserTracing({
//       tracingOrigins: ["localhost", "https://devapp.greenfutureproject.com", "https://app.greenfutureproject.com", "https://greenfutureproject.com"],
//       routingInstrumentation: Sentry.routingInstrumentation,
//     }),
//   ],
//   tracesSampleRate: 0.1,
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
