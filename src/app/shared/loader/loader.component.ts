import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {
  showLoader: boolean;

  constructor(private loaderService: LoaderService) {
    this.showLoader = false;
  }

  ngOnInit() {
    // Subscribe to the loader service's loaderState to show/hide the loader
    this.loaderService.loaderState.subscribe((state: boolean) => {
      this.showLoader = state;
    });
  }
}
