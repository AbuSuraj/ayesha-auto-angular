import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.less']
})
export class HeadersComponent implements OnInit {
  user: any; 
  menuItems: any; 
  activeRoute: ActivatedRoute;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.activeRoute = route;
   
  }

  ngOnInit(): void {
     this.authService.userDataSubject.subscribe(user => {
      this.user = user
      console.log('user', this.user);

    })
  }

  isActive(route: string): boolean {
    return this.activeRoute.snapshot.url.join('') === route;
  }

  handleLogOut(): void {
    this.authService.logout();
    // Handle the logout logic here
  }
}
