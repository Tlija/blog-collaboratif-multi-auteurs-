import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {AppComponent} from './app/main/commons/main-module/components/app.component/app.component';
import {ROUTES} from './app/core/routing/app.routes';
import 'zone.js';
import {provideHttpClient, withFetch} from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withFetch()),
  ],
}).catch(err => console.error(err));
