import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.logOut();
  }

}