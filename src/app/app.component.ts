import { Component } from '@angular/core';
import { OnChanges, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements DoCheck{
  title = 'schoolmonitor';
  recieverChannel = new BroadcastChannel('auth');
  constructor(public router:Router){

  }
  ngDoCheck(){
    
    this.recieverChannel.addEventListener('message', (e) => {
    if(e.data.cmd=='logOut'){
      this.router.navigateByUrl('/Login');
      this.recieverChannel.close();
    }
    
    });
    
    }
   
}
