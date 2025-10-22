import {Route} from '@angular/router';
import {ClientSideRouteContainerModel} from './user_side_route_container.model';

export const CLIENT_ROUTES: Route[] = [

  {
    path: ClientSideRouteContainerModel.DASHBOARD_ROUTE.path,
    loadComponent: () =>
      import(
        '../../../main/blog-module/dashborad-container/dashborad-container'
        ).then(component => component.DashboardContainer),

  },
  {
    path: ClientSideRouteContainerModel.ANY_OTHER_CLIENT_ROUTE.path,
    redirectTo: ClientSideRouteContainerModel.DASHBOARD_ROUTE.path,
  },
];
