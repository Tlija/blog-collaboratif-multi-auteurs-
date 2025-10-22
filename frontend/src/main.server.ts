import {BootstrapContext, bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/main/commons/main-module/components/app.component/app.component';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(AppComponent, appConfig, context);

export default bootstrap;
