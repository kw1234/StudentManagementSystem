import { Component } from '@angular/core';
import { TableComponent } from './table.component';
import { AuthService } from './auth.service';

import * as moment from 'moment';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  currWeekId = this.getCurrentWeek();

  constructor(public table: TableComponent, public auth: AuthService) {}

  ngOnInit() {}

  leftDecrement() {
    this.currWeekId = Math.max(0, this.currWeekId - 1);
    console.log(this.currWeekId);
    this.table.getTableData(this.auth.email, this.currWeekId);
  }

  rightIncrement() {
    this.currWeekId = Math.min(this.getCurrentWeek(), this.currWeekId + 1);
    console.log(this.currWeekId);
    this.table.getTableData(this.auth.email, this.currWeekId);
  }

  getCurrentWeek() {
    return parseInt(moment().format('W'));
  }

  getCurrentDate() {
    return moment().day('Sunday').week(this.currWeekId).format('MM/DD/YYYY');
  }
}
