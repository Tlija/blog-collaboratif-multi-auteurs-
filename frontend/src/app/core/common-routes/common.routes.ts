import { Route } from '@angular/router';
import { CommonRouteContainerModel } from './common-route-container.model';

export const COMMON_ROUTES: Route[] = [
 
  {
    path: CommonRouteContainerModel.ANY_OTHER_COMMON_ROUTE.path,
    redirectTo: CommonRouteContainerModel.LOGIN_ROUTE.path,
  },
];
