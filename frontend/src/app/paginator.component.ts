import { Component } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  currWeekId = this.getCurrentWeek();

  constructor() {}

  ngOnInit() {}

  leftDecrement() {
    this.currWeekId = Math.max(0, this.currWeekId - 1);
    console.log(this.currWeekId);
  }

  rightIncrement() {
    this.currWeekId = Math.min(this.getCurrentWeek(), this.currWeekId + 1);
    console.log(this.currWeekId);
  }

  getCurrentWeek() {
    return parseInt(moment().format('W'));
  }
}
