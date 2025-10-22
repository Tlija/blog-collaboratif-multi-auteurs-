import { RouteContainerModel } from 'social-vista-lib';

export class ClientSideRouteContainerModel extends RouteContainerModel {
  static readonly prefix = 'client';
  static readonly DASHBOARD_ROUTE: ClientSideRouteContainerModel =
    RouteContainerModel.createRouteContainerModelFactory(
      {
        path: 'dashboard',
      },
      ClientSideRouteContainerModel
    );

  static readonly ANY_OTHER_CLIENT_ROUTE: ClientSideRouteContainerModel =
    RouteContainerModel.createRouteContainerModelFactory(
      {
        path: '**',
      },
      ClientSideRouteContainerModel
    );

}
