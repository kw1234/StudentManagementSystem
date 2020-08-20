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
import { FormControl } from '@angular/forms';
import { AssignmentComponent } from './assignment.component';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'scheduleTable',
  templateUrl: './table.component.html',
  styleUrls: ['table.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
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
    this.getTableData();
    this.dataSource = [];
    for (let i = 0; i < 8; i++) {
      this.dataSource.push({
        class: '',
        monday: {
          name: '',
          type: '',
          progress: '',
        },
        tuesday: {
          name: '',
          type: '',
          progress: '',
        },
        wednesday: {
          name: '',
          type: '',
          progress: '',
        },
        thursday: {
          name: '',
          type: '',
          progress: '',
        },
        friday: {
          name: '',
          type: '',
          progress: '',
        },
        letterGrade: '',
        percentage: '',
        gradeColor: '',
        comments: '',
        todo: '',
      });
    }
  }

  saveData(data) {}

  tableInput() {
    console.log(this.dataSource);
    this.http.post(this.BASE_URL + '/postData', this.dataSource).subscribe(
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
  }

  getTableData(userId, weekId) {
    console.log(this.dataSource);
    this.http
      .get(this.BASE_URL + `/getData?studentId=${userId}&weekId=${weekId}`)
      .subscribe(
        (response) => {
          console.log(response);
          //this.textStore = [response.json()];
          //this.textSubject.next(this.textStore);
          //this.getFileNames();
          //this.dataSource = response.json();
        },
        (error) => {
          console.log(`unable to save data with error: ${error}`);
        }
      );
  }

  getFromChild(value) {
    console.log('mamama');
    console.log(value);
  }
}
