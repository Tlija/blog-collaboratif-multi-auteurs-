import {Component, output, signal} from '@angular/core';
import { CommonRouteContainerModel } from '../../../../../../core/routing/common-routes/common-route-container.model';
import { RouterLink } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileModel} from '../../../models/profile.model';

@Component({
  selector: 'app-login-presentation',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './login-presentation.component.html',
  standalone: true,
  styleUrl: './login-presentation.component.scss',
})
export class LoginPresentationComponent {
  readonly signupRouterLink = CommonRouteContainerModel.SIGNUP_ROUTE.fullPath;
  readonly formData = signal<ProfileModel>({
    username: '',
    email: '',
    password: ''
  });

  readonly login = output<ProfileModel>();
  onSubmit() {
    console.log('onSubmit clicked')
    this.login.emit(this.formData())
  }

}
