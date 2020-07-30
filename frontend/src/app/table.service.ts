import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';
import { timeout } from 'rxjs/operators';
'rxjs/Rx';

@Injectable()
export class TableService {
  public pageDataStore = [];
  public pageDataSubject = new Subject();
  pageData = this.pageDataSubject.asObservable();

  constructor(private http: Http) {}

  BASE_URL = 'http://localhost:8080/api';

  loading = false;

  saveData(data) {
    console.log(data);
    this.http.post(this.BASE_URL + '/saveData', data).subscribe(
      (response) => {
        console.log(response);
        //this.textStore = [response.json()];
        //this.textSubject.next(this.textStore);
        //this.getFileNames();
        this.pageDataStore = response.json();
        this.pageDataSubject.next(this.pageDataStore);
        //console.log(response.json());
        data = response.json();
      },
      (error) => {
        console.log(`unable to save data with error: ${error}`);
      }
    );
  }

  getData() {
    return this.pageDataStore;
  }
}
