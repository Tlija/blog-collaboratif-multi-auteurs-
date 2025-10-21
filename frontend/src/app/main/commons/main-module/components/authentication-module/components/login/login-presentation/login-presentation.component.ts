import { Component } from '@angular/core';
import { CommonRouteContainerModel } from '../../../../../../core/routing/common-routes/common-route-container.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-presentation',
  imports: [
    RouterLink,
  ],
  templateUrl: './login-presentation.component.html',
  standalone: true,
  styleUrl: './login-presentation.component.scss',
})
export class LoginPresentationComponent {
  readonly signupRouterLink = CommonRouteContainerModel.SIGNUP_ROUTE.fullPath;
  readonly forgotPasswordRouterLink = CommonRouteContainerModel.FORGET_PASSWORD_ROUTE.fullPath;


}
