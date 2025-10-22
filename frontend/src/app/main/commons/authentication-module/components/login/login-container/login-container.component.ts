import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {LoginPresentationComponent} from '../login-presentation/login-presentation.component';
import {AuthStore} from '../../../store/auth.store';
import {ProfileModel} from '../../../models/profile.model';

@Component({
  selector: 'app-login-container',
  imports: [LoginPresentationComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginContainerComponent {
  authStore = inject(AuthStore);
  isLoading = computed(() => this.authStore.isLoading());
  error = computed(() => this.authStore.error());

  onLogin(formData: ProfileModel) {

    console.log('Form data received:', formData);

    if (!formData.username || !formData.email || !formData.password) {
      return;
    }

    this.authStore.login({
      expectedRole: 'user',
      email: formData.email,
      password: formData.password,
    });
  }

}
