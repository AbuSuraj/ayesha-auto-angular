import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  user:any
  constructor(private authService: AuthService){
    // console.log(this.authService.userData?.multiFactor?.user);
    
  }
  ngOnInit(): void {
  //  this.user =  this.authService?.getAuthLocal();
  //  console.log(this.user);
  // console.log(this.authService.getAuthFire())
  }

}
