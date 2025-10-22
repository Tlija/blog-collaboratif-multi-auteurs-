import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {ROUTES} from './core/routing/app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(ROUTES),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ]
};
