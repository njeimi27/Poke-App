import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('searchAnimation', [
      state('visible', style({
        display: 'flex'
      })),
      state('hidden', style({
        display: 'none'
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class NavbarComponent {
  isSearchCollapsed = true;

  toggleSearch() {
    this.isSearchCollapsed = !this.isSearchCollapsed;
  }

}
