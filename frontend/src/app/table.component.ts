import { Component, ViewChild } from '@angular/core';
import { TableService } from './table.service';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
//import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Rx';
import { timeout } from 'rxjs/operators';
'rxjs/Rx';

@Component({
  selector: 'scheduleTable',
  templateUrl: './table.component.html',
  styleUrls: ['table.css'],
})
export class TableComponent {
  dataSource = [];
  colNames = [
    'class',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'letterGrade',
    'percentage',
    'gradeColor',
    'comments',
    'todo',
    'save',
  ];

  wordData = {
    word: '',
  };

  data = {};
  BASE_URL = 'http://localhost:8080/api';

  constructor(public tableService: TableService, private http: Http) {}

  ngOnInit() {
    this.dataSource = [];
    for (let i = 0; i < 8; i++) {
      this.dataSource.push({
        class: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        letterGrade: '',
        percentage: '',
        gradeColor: '',
        comments: '',
        todo: '',
      });
    }
    //this.csvServ.getPageReq(0);
  }

  saveData(data) {}

  tableInput() {
    this.http.post(this.BASE_URL + '/saveData', this.dataSource).subscribe(
      (response) => {
        console.log(response);
        //this.textStore = [response.json()];
        //this.textSubject.next(this.textStore);
        //this.getFileNames();
        this.dataSource = response.json();
      },
      (error) => {
        console.log(`unable to save data with error: ${error}`);
      }
    );
    //this.tableService.saveData(this.dataSource);
    //console.log(this.tableService.getData());
    //this.tableService.getData();
    //this.dataSource = this.tableService.getData();
    //console.log(this.tableService.getData());
  }
}
