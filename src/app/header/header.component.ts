import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginComponent : LoginComponent) { }
  showHeader:boolean;
  ngOnInit() {
    this.showHeader=this.loginComponent.loginStatus;
  }

}