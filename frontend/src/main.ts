import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/main/commons/main-module/components/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
