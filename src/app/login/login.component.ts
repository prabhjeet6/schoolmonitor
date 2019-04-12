import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { LoginCredentials } from 'src/app/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginCredentials:LoginCredentials;

  constructor(public loginService:LoginService) { }

  ngOnInit() {
  }

}
