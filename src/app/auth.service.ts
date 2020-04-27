import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
redirectUrl:string;
  constructor(public jwtHelper: JwtHelperService) {}
 
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    
    return !this.jwtHelper.isTokenExpired(token);
  }
}
