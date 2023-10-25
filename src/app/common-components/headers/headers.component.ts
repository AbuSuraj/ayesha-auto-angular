import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/services/service-proxies/users/users.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.less']
})
export class HeadersComponent implements OnInit {
  user: any; 
  menuItems: any; 
  activeRoute: ActivatedRoute;
  loggedInUser:any;
  constructor(private route: ActivatedRoute, private authService: AuthService,  private tost: ToastrService, private usersService: UsersService) {
    this.activeRoute = route;
   
  }

  ngOnInit(): void {
    this.authService.userDataSubject.pipe(
      switchMap(user => {
        this.user = user;
        return this.usersService.getLoggedInUserInfo(this.user);
      })
    ).subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute.snapshot.url.join('') === route;
  }

  handleLogOut(): void {
    this.authService.logout();
    this.tost.info('Logged out')

  }
}
