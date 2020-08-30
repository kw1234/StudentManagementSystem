import { Component, ViewEncapsulation } from '@angular/core';
import { TableComponent } from './table.component';
import { AuthService } from './auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

import * as moment from 'moment';

@Component({
  selector: 'paginator',
  styleUrls: ['paginator.css'],
  templateUrl: './paginator.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent {
  currWeekId = this.getCurrentWeek();
  currDate = this.getCurrentDate();

  dateClass = (d): MatCalendarCellCssClasses => {
    const date = d.toDate().getDate();
    //console.log(parseInt(moment(d.toDate()).format('W')));

    //console.log(this.isSameWeek(date));

    // Highlight the 1st and 20th day of each month.
    //console.log(this.isSameWeek(date));
    return this.isSameWeek(d.toDate()) ? 'custom-date-class' : '';
  };

  myFormGroup: FormGroup;

  constructor(public table: TableComponent, public auth: AuthService) {}

  ngOnInit() {}

  leftDecrement() {
    this.currWeekId = Math.max(0, this.currWeekId - 1);
    console.log(this.currWeekId);
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.currWeekId);
  }

  rightIncrement() {
    this.currWeekId = Math.min(this.getCurrentWeek(), this.currWeekId + 1);
    console.log(this.currWeekId);
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.currWeekId);
  }

  getCurrentWeek() {
    return parseInt(moment().format('W'));
  }

  getCurrentDate() {
    return moment().day('Sunday').week(this.currWeekId).format('MM/DD/YYYY');
  }

  isSameWeek(date) {
    console.log(parseInt(moment(date).format('W')));
    console.log(this.currWeekId);
    return parseInt(moment(date).format('W')) == this.currWeekId;
  }

  onDate(event) {
    console.log(parseInt(event.value.format('W')));
    this.currWeekId = parseInt(event.value.format('W'));
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.currWeekId);
  }
}
