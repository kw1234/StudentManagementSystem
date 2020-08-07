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

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'assignment',
  templateUrl: './assignment.component.html',
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
export class AssignmentComponent {
  disableSelect = new FormControl(false);

  wordData = {
    word: '',
  };

  dataSource = [];
  data = {};
  BASE_URL = 'http://localhost:8080/api';

  constructor(public tableService: TableService, private http: Http) {}

  //when: (index: number, rowData: T) => boolean;

  ngOnInit() {}

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
