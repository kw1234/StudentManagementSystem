import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
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

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['table.css'],
})
export class ToolbarComponent {
  disableSelect = new FormControl(false);
  @Input() rowData: any = { index: 0, data: { type: '', progress: '' } };
  @Output() sendToParent = new EventEmitter();

  selections = [];

  selectedAssignment = '';
  selectedProgress = '';

  dataSource = [];
  data = {};
  BASE_URL = 'http://localhost:8080/api';

  constructor(public tableService: TableService, private http: Http) {}

  ngOnInit() {}
}
