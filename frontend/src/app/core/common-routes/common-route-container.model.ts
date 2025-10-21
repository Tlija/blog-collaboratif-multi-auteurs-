import { RouteContainerModel } from 'social-vista-lib';

export class CommonRouteContainerModel extends RouteContainerModel {
  static readonly prefix = '';
  static readonly LOGIN_ROUTE: CommonRouteContainerModel =
    RouteContainerModel.createRouteContainerModelFactory(
      {
        path: 'login',
      },
      CommonRouteContainerModel
    );
  static readonly SIGNUP_ROUTE: CommonRouteContainerModel =
    RouteContainerModel.createRouteContainerModelFactory(
      {
        path: 'signup',
      },
      CommonRouteContainerModel
    ); 
  static readonly ANY_OTHER_COMMON_ROUTE: CommonRouteContainerModel =
    RouteContainerModel.createRouteContainerModelFactory(
      {
        path: '**',
      },
      CommonRouteContainerModel
    );
}
