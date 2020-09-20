import { Component, Inject } from '@angular/core';
import { TableService } from './table.service';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
('rxjs/add/operator/toPromise');

('rxjs/Rx');

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface DialogData {
  animal: string;
  name: string;
}

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
  animal: string;
  name: string;

  //BASE_URL = 'https://studentsystem-288207.uc.r.appspot.com/api';
  BASE_URL = 'http://localhost:8080/api';

  constructor(
    public tableService: TableService,
    public auth: AuthService,
    private http: Http,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //this.dataSource = [];
    console.log(this.auth.plannerEmail);
    this.getTableData(
      this.auth.plannerEmail,
      String(parseInt(this.tableService.getCurrentWeek()) - 1)
    );
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
    const entry = {
      rows: this.dataSource,
      email: this.auth.plannerEmail,
      weekId: String(this.tableService.currWeekId),
    };
    this.http.post(this.BASE_URL + '/postData', entry).subscribe(
      (response) => {
        //console.log(response);
        //this.textStore = [response.json()];
        //this.textSubject.next(this.textStore);
        //this.getFileNames();
        const result = response.json();
        this.dataSource = result.plannerData;
      },
      (error) => {
        console.log(`unable to save data with error: ${error}`);
      }
    );
  }

  getTableData(email, weekId) {
    console.log(this.dataSource);
    this.http
      .get(this.BASE_URL + `/getData?email=${email}&weekId=${weekId}`)
      .subscribe(
        (response) => {
          console.log(response);
          //this.textStore = [response.json()];
          //this.textSubject.next(this.textStore);
          //this.getFileNames();
          const result = response.json();
          this.dataSource = result.plannerData;
        },
        (error) => {
          console.log(`unable to save data with error: ${error}`);
        }
      );
  }

  getFromChild(value) {
    console.log(value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(result);
    });
  }
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
