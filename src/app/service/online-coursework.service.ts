import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SearchInputModel } from './../model/search-input-model';
import { Constants } from '../utils/constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': localStorage.getItem('userToken'), 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OnlineCourseworkService {
  searchInputModel?: SearchInputModel;
  
  constructor(private constants:Constants,private http: HttpClient) { 
    this.searchInputModel={};
  }
  private searchOnlineCourseworkUrl = 'http://'+this.constants.host+'/schoolmonitor/searchOnlineCoursework';
  search(searchTerm?: string, currentPage?: number): Observable<any> {
    if(currentPage)
    this.searchInputModel.currentPage = currentPage;
    if(searchTerm)
    this.searchInputModel.searchTerm = searchTerm;
    return this.http.post<any>(this.searchOnlineCourseworkUrl, this.searchInputModel, {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('userToken') }),
      responseType: 'json'

    });

  } 
}
