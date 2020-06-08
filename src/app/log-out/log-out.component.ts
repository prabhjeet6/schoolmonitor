import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DoCheck, AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { of } from 'rxjs';
@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(public  auth: AuthService, public router:Router) { }

  ngOnInit() {
    
     
     
     
  }

}
