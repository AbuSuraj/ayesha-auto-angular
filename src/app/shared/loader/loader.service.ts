import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  public loaderState = this.loaderSubject.asObservable();

  constructor() {}

  // Show the loader
  show() {
    this.loaderSubject.next(true);
  }

  // Hide the loader
  hide() {
    this.loaderSubject.next(false);
  }
}
