import { Component } from '@angular/core';
import { CommonRouteContainerModel } from '../../../../../../core/routing/common-routes/common-route-container.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-presentation',
  imports: [
    RouterLink,
  ],
  templateUrl: './signup-presentation.component.html',
  standalone: true,
  styleUrl: './signup-presentation.component.scss',
})
export class SignupPresentationComponent {
  readonly loginRouterLink = CommonRouteContainerModel.LOGIN_ROUTE.fullPath;

}
