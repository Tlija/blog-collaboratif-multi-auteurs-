import {Component, inject, signal} from '@angular/core';
import {SignupPresentationComponent} from '../signup-presentation/signup-presentation.component';
import {Router} from '@angular/router';
import {AuthStore} from '../../../store/auth.store';
import {ProfileModel} from '../../../models/profile.model';
import {CommonRouteContainerModel} from '../../../../../../core/routing/common-routes/common-route-container.model';

@Component({
  selector: 'app-signup-container',
  imports: [
    SignupPresentationComponent,
  ],
  templateUrl: './signup-container.component.html',
  standalone: true,
  styleUrl: './signup-container.component.scss',
})
export class SignupContainerComponent {
  // authStore = inject(AuthStore);

  onSignup(formData: ProfileModel) {

    console.log('Form data received:', formData);

    // if (!formData.username || !formData.email || !formData.password) {
    //   console.error('Missing required fields');
    //   return;
    // }

    // this.authStore.register({
    //   username: formData.username,
    //   email: formData.email,
    //   password: formData.password,
    // });
  }


}
