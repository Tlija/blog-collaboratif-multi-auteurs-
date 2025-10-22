import { Routes } from '@angular/router';
import { CommonRouteContainerModel } from './common-routes/common-route-container.model';
import {ClientSideRouteContainerModel} from './user_side_route_container/user_side_route_container.model';

export const ROUTES: Routes = [
  {
    path: CommonRouteContainerModel.prefix,
    loadChildren: () =>
      import('./common-routes/common.routes').then(mod => mod.COMMON_ROUTES),
    data: {
      noShowToolbar: true,
    },
  },
  {
    path: ClientSideRouteContainerModel.prefix,
    loadChildren: () =>
      import('./user_side_route_container/user_side.routes').then(mod => mod.CLIENT_ROUTES),
  },
];
