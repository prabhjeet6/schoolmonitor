import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router/src/router';
import { LoginCredentials } from 'src/app/login-credentials';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http/src/params';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;
  private loginUrl = 'http://localhost:8088/auth/signin';
  requestBody: string;
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  confirmLogin(url: string, router: Router): boolean {
    if (this.isAuthenticated()) {
      return true;
    }
    this.redirectUrl = url;
    router.navigateByUrl('/Login');
    return false;
  }

  login(loginCredentials: LoginCredentials): Observable<object> {
    this.requestBody = JSON.stringify(loginCredentials);
    return this.http.post<object>(this.loginUrl, this.requestBody, httpOptions);
    //.pipe( catchError(this.handleError<boolean>('Login', false)));

  }
}
