import { Injectable } from '@angular/core';
import { LoginCredentials } from 'src/app/login-credentials';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'localhost:8080/Login';
  constructor(private http: HttpClient) { }
  Login(loginCredentials: LoginCredentials): Observable<boolean> {

    return this.http.get<boolean>(this.loginUrl).pipe(
      catchError(this.handleError<boolean>('Login', false)));

  }


  /*Handle the Http Operation that failed
  Let the app continue
  @param operation-name of the operation that failed
  @param result- optional value to return as the observable result */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      return of(result as T);
    }
  }
}
