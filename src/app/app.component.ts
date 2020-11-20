import { Component } from '@angular/core';
import { OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  
{
  title = 'schoolmonitor';
  constructor(public router:Router){
  }  
}
