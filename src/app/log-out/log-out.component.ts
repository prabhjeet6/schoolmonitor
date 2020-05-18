import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
logOut(){
  localStorage.clear();
  this.router.navigateByUrl('/Login');
}
}
