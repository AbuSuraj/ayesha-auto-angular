import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.less']
})
export class HeadersComponent {
  user: any; // Replace 'any' with the actual user type you are using
  menuItems: any; // Replace 'any' with the actual type for menu items
  activeRoute: ActivatedRoute;

  constructor(private route: ActivatedRoute) {
    this.activeRoute = route;
  }

  isActive(route: string): boolean {
    return this.activeRoute.snapshot.url.join('') === route;
  }

  handleLogOut(): void {
    // Handle the logout logic here
  }
}
