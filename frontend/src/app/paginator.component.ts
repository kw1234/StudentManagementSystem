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
  currDate = this.getCurrentDate();

  dateClass = (d): MatCalendarCellCssClasses => {
    const date = d.toDate();
    let begin = moment(date).startOf('week').isoWeekday(1);

    return this.isSameWeek(date) ? 'custom-date-class' : '';
  };

  myFormGroup: FormGroup;

  constructor(public table: TableComponent, public auth: AuthService) {}

  ngOnInit() {}

  leftDecrement() {
    this.auth.currWeekId = Math.max(0, this.auth.currWeekId - 1);
    console.log(this.auth.currWeekId);
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.auth.currWeekId);
  }

  rightIncrement() {
    this.auth.currWeekId = Math.min(
      this.getCurrentWeek(),
      this.auth.currWeekId + 1
    );
    console.log(this.auth.currWeekId);
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.auth.currWeekId);
  }

  getCurrentWeek() {
    let begin = moment().startOf('week').isoWeekday(1);
    console.log(parseInt(begin.format('W')));
    return parseInt(begin.format('W'));
  }

  getCurrentDate() {
    let begin = moment().startOf('week').isoWeekday(1);
    console.log(
      moment()
        .day('Saturday')
        .week(this.auth.currWeekId)
        .add(1, 'd')
        .format('MM/DD/YYYY')
    );
    // the add here is how the correct sunday date is shown with the week
    // iso date standards have weeks starting on Monday, so getting this corresponding
    // date was a pain for many hours.
    return begin
      .day('Saturday')
      .week(this.auth.currWeekId)
      .add(1, 'd')
      .format('MM/DD/YYYY');
  }

  isSameWeek(date) {
    let begin = moment(date).startOf('week').isoWeekday(1);
    return parseInt(begin.format('W')) == this.auth.currWeekId;
  }

  onDate(event) {
    console.log(event);
    let begin = moment(event.value).startOf('week').isoWeekday(1);
    this.auth.currWeekId = parseInt(begin.format('W'));
    this.currDate = this.getCurrentDate();
    this.table.getTableData(this.auth.email, this.auth.currWeekId);
  }
}
