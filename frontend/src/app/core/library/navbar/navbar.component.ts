// navbar.component.ts
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrls: ['./navbar.component.scss'],
  imports: [NgIf],
})
export class NavbarComponent {
  visibleDropdown: string | null = null;
  isMenuOpen: boolean = false;

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