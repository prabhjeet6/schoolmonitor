import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from 'src/app/login-credentials';
import { String, StringBuilder } from 'typescript-string-operations';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { History } from 'ngx-bootstrap/utils/facade/browser';

/**@author Prabhjeet Singh */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  userNameWithDomain: string;
  password: string;
  loginStatus: boolean | undefined;
  userToken: object;
  loginCredentials: any;
  observableLoginRequest: Observable<object>;
  subscriptionObject: Subscription;

  constructor(public auth: AuthService,  public router: Router) {

    this.loginCredentials = new LoginCredentials();
  }

  ngOnInit() {

  }
  setCredentials(userNameWithDomain: string): boolean {
    var domainAndUserName;
    if (!String.IsNullOrWhiteSpace(userNameWithDomain)) {
      if (userNameWithDomain.indexOf("/") != -1) {
        domainAndUserName = userNameWithDomain.split("/", 2);
      }
      else if (userNameWithDomain.indexOf('\\') != -1) {
        domainAndUserName = userNameWithDomain.split("\\", 2);
      }
      else return false;
      this.loginCredentials.domain = domainAndUserName[0] as string;
      this.loginCredentials.username = domainAndUserName[1] as string;
      this.loginCredentials.password = this.password;

      return true;
    }
    else return false;


  }
  login(): boolean {

    if (this.setCredentials(this.userNameWithDomain)) {
      this.observableLoginRequest = this.auth.login(this.loginCredentials);
      this.subscriptionObject = this.observableLoginRequest.subscribe(x => { this.userToken = x; this.loginStatus = true; this.userNameWithDomain = ''; this.password = ''; }, err => { this.loginStatus = false; this.userNameWithDomain = ''; this.password = ''; }, () => this.subscriptionObject.unsubscribe);

    } else {
      this.loginStatus = false;
      this.userNameWithDomain = '';
      this.password = '';
    }


    return this.loginStatus;
  }

  redirectToIntendedUrl(): void {

    localStorage.setItem('userToken', this.userToken['Token']);

    if (this.auth.redirectUrl == undefined)
      this.router.navigateByUrl(`/Dashboard`);
    else this.router.navigateByUrl(this.auth.redirectUrl);



  }
}
