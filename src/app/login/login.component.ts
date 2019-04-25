import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { LoginCredentials } from 'src/app/login-credentials';
import { String, StringBuilder } from 'typescript-string-operations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
   loginCredentials: LoginCredentials;
  userNameWithDomain: string;
  password: string;

  constructor(public loginService: LoginService) { }

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
      
      this.loginCredentials.domain = domainAndUserName[0];
      this.loginCredentials.userName = domainAndUserName[1];
      this.loginCredentials.password = this.password;
     
    }
    else return false;


  }
  Login(): boolean {
    if (this.setCredentials(this.userNameWithDomain)) {
      this.loginService.Login(this.loginCredentials).subscribe(LoginCredentials => this.loginCredentials);
      return true;
    }
    else return false;
  }
}
