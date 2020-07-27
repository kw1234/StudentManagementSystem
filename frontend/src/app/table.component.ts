import { Component, ViewChild} from '@angular/core';
import {TableService} from './table.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'scheduleTable',
  templateUrl: './table.component.html'
})
export class TableComponent {
       dataSource = [];
       colNames = ["class", "monday", "tuesday", "wednesday", "thursday", "friday", "letterGrade", "percentage", "gradeColor", "comments", "todo", "save"];


       @ViewChild(MatPaginator) paginator: MatPaginator;
       constructor(public tableService: TableService) {
          //this.csvServ.getPageReq(0);
       }

       ngOnInit() {
          this.dataSource = [{class: "a", monday: "monday", tuesday: "tuesday", wednesday: "wednesday",
	      thursday: "thursday", friday: "friday", letterGrade: "letterGrade", percentage: "percentage",
	      gradeColor: "gradeColor", comments: "comments", todo: "todo"},
	      {class: "a", monday: "monday", tuesday: "tuesday", wednesday: "wednesday",
              thursday: "thursday", friday: "friday", letterGrade: "letterGrade", percentage: "percentage",
              gradeColor: "gradeColor", comments: "comments", todo: "todo"}];
          //this.csvServ.getPageReq(0);
       }
}