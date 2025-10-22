import {Route} from '@angular/router';
import {CommonRouteContainerModel} from './common-route-container.model';

export const COMMON_ROUTES: Route[] = [
  {
    path: CommonRouteContainerModel.LOGIN_ROUTE.path,
    loadComponent: () =>
      import(
        '../../../main/commons/authentication-module/components/login/login-container/login-container.component'
        ).then(component => component.LoginContainerComponent),
  },
  {
    path: CommonRouteContainerModel.SIGNUP_ROUTE.path,
    loadComponent: () =>
      import(
        '../../../main/commons/authentication-module/components/signup/signup-container/signup-container.component'
        ).then(component => component.SignupContainerComponent),
  },
  {
    path: CommonRouteContainerModel.HOME_ROUTE.path,
    loadComponent: () =>
      import(
        '../../../main/commons/home-module/home-container/home-container'
        ).then(component => component.HomeContainer),
  },

  {
    path: CommonRouteContainerModel.ANY_OTHER_COMMON_ROUTE.path,
    redirectTo: CommonRouteContainerModel.HOME_ROUTE.path
  },
];
