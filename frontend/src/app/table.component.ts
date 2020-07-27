import { Component, ViewChild} from '@angular/core';
//import {CsvService} from './csv.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'scheduleTable',
  templateUrl: './table.component.html'
})
export class TableComponent {
       dataSource = [];
       colNames = ["Class", "Monday", "Tuesday"];

       canView = this.dataSource.length > 0;

       @ViewChild(MatPaginator) paginator: MatPaginator;
       constructor() {
          //this.csvServ.getPageReq(0);
       }

       ngOnInit() {
          //this.csvServ.getPageReq(0);
       }
}