import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.less']
})
export class DashboardHomeComponent implements OnInit{
  options: AnimationOptions = {
    path: 'https://lottie.host/4a73f4a5-29ae-4f21-a809-289fec509a15/NJGe5lvBUO.json',
     // download the JSON version of animation in your project directory and add the path to it like ./assets/animations/example.json
  };
  ngOnInit(): void {  }

  onAnimate(animationItem: any): void {    
    console.log(animationItem);  
  }
}
