import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginPresentationComponent } from '../login-presentation/login-presentation.component';

@Component({
  selector: 'app-login-container',
  imports: [LoginPresentationComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoginContainerComponent {}
