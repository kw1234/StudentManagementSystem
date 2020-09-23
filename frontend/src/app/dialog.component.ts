import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { TableService } from './table.service';

export interface DialogData {
  classList: string[];
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-button',
  templateUrl: 'dialog-button.component.html',
})
export class DialogButtonComponent {
  @Input() dataSource: Object[] = [];
  @Output() public onDialogClose: EventEmitter<any> = new EventEmitter();
  classList: string[];
  name: string;
  BASE_URL = this.table.baseUrl;

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private http: Http,
    public table: TableService
  ) {}

  ngOnInit() {
    console.log(this.BASE_URL);
    console.log(this.dataSource);
    this.http
      .get(
        this.BASE_URL + `/student/getClassList?email=${this.auth.plannerEmail}`
      )
      .toPromise()
      .then(function (result) {
        const classList = result.json().classList;
        console.log(classList + ' initlist');
        return classList;
      })
      .then((classes) => (this.classList = classes));
  }

  openDialog(): void {
    console.log(this.dataSource);
    console.log(this.classList);
    this.http
      .get(
        this.BASE_URL + `/student/getClassList?email=${this.auth.plannerEmail}`
      )
      .toPromise()
      .then(function (result) {
        const classList = result.json().classList;
        return classList;
      })
      .then((classes) => (this.classList = classes));
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { classList: this.classList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
      this.classList = result ? result : this.classList;
      this.onDialogClose.emit(this.classList);
      const entry = {
        email: this.auth.plannerEmail,
        classList: this.classList,
      };
      console.log(this.classList + ' BOLO');
      this.http
        .post(this.BASE_URL + `/student/updateClassList`, entry)
        .toPromise()
        .then(() => this.updateClassListHelper(this.classList));
    });
  }

  updateClassListHelper(classes) {
    for (let i = 0; i < 8; i++) {
      this.dataSource[i]['class'] = classes[i];
    }
    console.log(this.dataSource);
  }
}

@Component({
  selector: 'dialog-form',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  classList: string[];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log(data);
  }

  onNoClick(): void {
    console.log('bum');
    console.log(this.data);
    this.data.classList = this.data.classList;
    //this.dialogRef.close();
  }
}
