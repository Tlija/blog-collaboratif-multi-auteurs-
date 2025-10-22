import { Component } from '@angular/core';
import { SignupPresentationComponent } from '../signup-presentation/signup-presentation.component';

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

}
