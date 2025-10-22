import { Routes } from '@angular/router';
import { CommonRouteContainerModel } from './common-routes/common-route-container.model';

export const ROUTES: Routes = [
  {
    path: CommonRouteContainerModel.prefix,
    loadChildren: () =>
      import('./common-routes/common.routes').then(mod => mod.COMMON_ROUTES),
    data: {
      noShowToolbar: true,
    },
  },
];
