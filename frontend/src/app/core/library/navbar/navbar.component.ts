import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {CommonRouteContainerModel} from '../../routing/common-routes/common-route-container.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.scss'],
  imports: [],
})
export class NavbarComponent {
  private readonly _router = inject(Router);

  visibleDropdown: string | null = null;
  isMenuOpen = false;
  isUserLoggedIn = false;

  goToLogin() {
    this._router.navigate([CommonRouteContainerModel.LOGIN_ROUTE.fullPath]);
  }

  goToSignUp() {
    this._router.navigate([CommonRouteContainerModel.SIGNUP_ROUTE.fullPath]);

  }
  goToHomePage() {
    this._router.navigate([CommonRouteContainerModel.HOME_ROUTE.fullPath]);

  }

  showDropdown(dropdownId: string) {
    this.visibleDropdown = dropdownId;
  }

  hideDropdown(dropdownId: string) {
    if (this.visibleDropdown === dropdownId) {
      this.visibleDropdown = null;
    }
  }

  isDropdownVisible(dropdownId: string): boolean {
    return this.visibleDropdown === dropdownId;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
