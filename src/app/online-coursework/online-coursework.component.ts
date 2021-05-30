import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineCourseworkService } from '../service/online-coursework.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SearchResponse } from './../model/search-response';
import { CustomWindow } from './../tts/custom-window';
import { element } from '@angular/core/src/render3/instructions';




declare let window: CustomWindow;

@Component({
  selector: 'app-online-coursework',
  templateUrl: './online-coursework.component.html',
  styleUrls: ['./online-coursework.component.css']
})


export class OnlineCourseworkComponent implements OnInit {

  constructor(public router: Router, public onlineCourseworkService?: OnlineCourseworkService) { }

  result: SearchResponse;
  subscriptionObject: Subscription;
  searchTerm?: string;
  results: any;
  page?: number = 1;
  resultsReturned: boolean;



  ngOnInit() {
    if (this.page === undefined)
      this.page = 1;
    if (this.result === undefined)
      this.result = {};
  }
  convertSpeechToTextAndSearch() {

    var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

    var keywords: string[] = [];
    var grammar = '#JSGF V1.0; grammar phrase; public <keyword> = ' + +';';
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    new Audio('../assets/Beep.mp3').play();

    recognition.start();
    var resultArrived: boolean = false;

    recognition.onresult =  (event)=> {
      var speechResult: string = event.results[0][0].transcript.toLowerCase();
      document.getElementsByTagName("input")[0].value = speechResult;
      this.searchTerm = speechResult;

      var searchbutton = document.getElementsByTagName("input")[0].nextSibling.lastChild as HTMLElement
      searchbutton.click();
      
    }

    recognition.onspeechend = function () {
      recognition.stop();
    }
     
  }



  postSearch() {
    if (this.result.totalNumberOfRecords > 0) {
      this.resultsReturned = true;
      this.results = this.result.searchResults;
    }
    else this.resultsReturned = false;
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.search();
  }


  search(): void {
    console.log('inside ' + this.searchTerm );
    if (this.searchTerm) {
      console.log('inside ' + this.searchTerm);
      this.subscriptionObject = this.onlineCourseworkService.search(this.searchTerm, this.page).subscribe(
        x => { setTimeout(() => { this.result = x; this.postSearch(); }, 2000); }, err => { }, () => this.subscriptionObject.unsubscribe);
    }
  }
}