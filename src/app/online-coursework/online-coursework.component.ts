import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineCourseworkService } from '../service/online-coursework.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchResponse } from './../model/search-response';
@Component({
  selector: 'app-online-coursework',
  templateUrl: './online-coursework.component.html',
  styleUrls: ['./online-coursework.component.css']
})
export class OnlineCourseworkComponent implements OnInit {

  constructor(public router: Router, public onlineCourseworkService?: OnlineCourseworkService) { }

  result: SearchResponse;
  subscriptionObject: Subscription;
  resultsReturned: boolean;
  searchTerm?: string;
  results:any; 
  
  page?:number=1;
   
  ngOnInit() {
    if(this.page===undefined)
      this.page=1;
      if(this.result===undefined)  
      this.result={};
  }
  search() { 
    if(this.searchTerm){ 
    this.subscriptionObject = this.onlineCourseworkService.search(this.searchTerm,this.page).subscribe(
      x => { setTimeout(() => { this.result = x; this.postSearch(); }, 2000); }, err => { }, () => this.subscriptionObject.unsubscribe);
    }
    }
  postSearch() {
    console.log("result "+this.result+" totalrecords "+ this.result.totalNumberOfRecords+" data "+this.result.searchResults)
    if (this.result.totalNumberOfRecords>0){
      this.resultsReturned = true;
      this.results=this.result.searchResults; 
    }
    else this.resultsReturned=false;   
  }
 pageChanged(event:any):void{
 this.page=event.page;  
 this.search();
 }
}
