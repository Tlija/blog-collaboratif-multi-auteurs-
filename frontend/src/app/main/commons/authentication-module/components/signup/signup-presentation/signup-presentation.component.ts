import {Component, output, signal} from '@angular/core';
import {CommonRouteContainerModel} from '../../../../../../core/routing/common-routes/common-route-container.model';
import {RouterLink} from '@angular/router';
import {ProfileModel} from '../../../models/profile.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup-presentation',
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './signup-presentation.component.html',
  standalone: true,
  styleUrl: './signup-presentation.component.scss',
})
export class SignupPresentationComponent {
  readonly loginRouterLink = CommonRouteContainerModel.LOGIN_ROUTE.fullPath;
  readonly formData = signal<ProfileModel>({
    username: '',
    email: '',
    password: ''
  });
  readonly signup = output<ProfileModel>();

  onSubmit() {
    console.log('onSubmit clicked')
    this.signup.emit(this.formData())
  }

}
