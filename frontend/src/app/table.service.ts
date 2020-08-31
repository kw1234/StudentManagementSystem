import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
('rxjs/add/operator/toPromise');
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';
import { timeout } from 'rxjs/operators';
('rxjs/Rx');
import * as moment from 'moment';

@Injectable()
export class TableService {
  /*public pageDataStore = [];
  public pageDataSubject = new Subject();
  pageData = this.pageDataSubject.asObservable();*/
  currWeekId = parseInt(this.getCurrentWeek());

  constructor(private http: Http) {}

  BASE_URL = 'http://localhost:8080/api';

  loading = false;

  saveData(data) {
    console.log(data);
    this.http.post(this.BASE_URL + '/saveData', data).subscribe();
  }

  getCurrentWeek() {
    return moment().format('W');
  }
}
