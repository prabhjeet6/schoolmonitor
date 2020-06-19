import { Injectable } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  timeout;
  routerChanged = true
  constructor(public router:Router) {this.router.events.subscribe((event: Event) => {

    if (event instanceof NavigationStart) {
      // Show loading indicator
      this.routerChanged = true;
    }

    if (event instanceof NavigationEnd) {
      // Hide loading indicator
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.routerChanged = false;
      }, 1000);
    }
  }); }
}
