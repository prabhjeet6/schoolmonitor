import { Component, OnInit } from '@angular/core';
import { OnChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.css']
})
export class OverflowMenuComponent implements OnInit {

  constructor(public auth:AuthService,public router: Router) { }

  ngOnInit() {
  }
  
  clickMenuItemLogOut():any{
    
    this.auth.logOut();
    this.router.navigateByUrl('/Login');
  }
  
}
