import {Inject, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoCheck, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {BROADCAST_CHANNEL_INJECTION_TOKEN} from './../app.token';
import{BroadcastService} from './../service/broadcast.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscription = new Subscription();
  constructor(public router:Router,@Inject(BROADCAST_CHANNEL_INJECTION_TOKEN) private broadCastService: BroadcastService) { }

  
  ngOnInit() {
    this.subscription.add(this.broadCastService.messagesOfType('auth').subscribe(message => {
     
      localStorage.clear();
      //this.broadcastingChannel.postMessage({ cmd: 'logOut' });
      
      this.router.navigateByUrl('/Login');
    }));
  }
 

 

}
