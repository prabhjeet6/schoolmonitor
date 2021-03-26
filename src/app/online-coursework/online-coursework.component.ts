import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineCourseworkService } from '../service/online-coursework.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchResults } from '../search-results';
@Component({
  selector: 'app-online-coursework',
  templateUrl: './online-coursework.component.html',
  styleUrls: ['./online-coursework.component.css']
})
export class OnlineCourseworkComponent implements OnInit {

  constructor(public router: Router, public onlineCourseworkService: OnlineCourseworkService) { }

  results: SearchResults[];
  subscriptionObject: Subscription;
  resultsReturned: boolean;
  searchTerm: string;

  ngOnInit() {
  }

  search() {
    this.subscriptionObject = this.onlineCourseworkService.search(this.searchTerm).subscribe(
      x => { setTimeout(() => { this.results = x; this.postSearch(); }, 2000); }, err => { }, () => this.subscriptionObject.unsubscribe);
  }

  

  postSearch() {
    if (null != this.results)
      this.resultsReturned = true;
    else this.router.navigateByUrl('/PageNotFound');
   //TODO:  
  }

}
