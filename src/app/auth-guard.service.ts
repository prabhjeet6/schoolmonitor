
import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { CanDeactivate, UrlTree, UrlSegment } from '@angular/router';
import { window } from 'rxjs/internal/operators/window';


@Injectable({
  providedIn: 'root'
})


@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<any> {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    
    return this.auth.confirmLogin(url, this.router);

  }
  canDeactivate(
    any: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ((this.auth.isAuthenticated() && nextState.url == '/Login')||(currentState.url=='/Login'&& !this.auth.isAuthenticated())) {
      history.pushState(null, null, location.href);
      return false;
    }
    
    else return true;
  }
}
  
