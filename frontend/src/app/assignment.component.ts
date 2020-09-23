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
('rxjs/add/operator/toPromise');
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
('rxjs/Rx');
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
  @Input() rowData: any = { index: 0, data: { type: '', progress: '' } };
  @Output() sendToParent = new EventEmitter();

  selections = [];

  selectedAssignment = '';
  selectedProgress = '';

  dataSource = [];
  data = {};

  constructor(public tableService: TableService, private http: Http) {}

  ngOnInit() {
    this.selections = [];
    for (let i = 0; i < 8; i++) {
      this.selections.push({
        selectedAssignment: '',
        selectedProgress: '',
      });
    }
  }

  saveData(data) {}

  getSelectedOptions() {
    return [this.selectedAssignment, this.selectedProgress];
  }

  onChange(event) {
    console.log(event);
    console.log(this.rowData);
    this.sendToParent.emit(this.rowData);
  }
}
