import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';

export interface DialogData {
  classList: string[];
  name: string;
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
  BASE_URL = 'http://localhost:8080/api';

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private http: Http
  ) {}

  ngOnInit() {
    console.log(this.dataSource);
    this.http
      .get(
        this.BASE_URL + `/student/getClassList?email=${this.auth.plannerEmail}`
      )
      .toPromise()
      .then(function (result) {
        const classList = result.json().classList;
        return classList;
      })
      .then((classList) => console.log(classList));
    this.classList = [];
    for (let i = 0; i < 8; i++) {
      this.classList.push(this.dataSource[i]['class']);
    }
    console.log(this.classList);
    /*this.classList = this.classList
      ? this.classList
      : ['', '', '', '', '', '', '', ''];*/
    this.name = 'laaaa';
  }

  openDialog(): void {
    console.log(this.name);
    console.log(this.classList);
    for (let i = 0; i < 8; i++) {
      this.classList[i] = this.dataSource[i]['class'];
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, classList: this.classList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      console.log('The dialog was closed');
      this.classList = result ? result : this.classList;
      for (let i = 0; i < 8; i++) {
        this.dataSource[i]['class'] = this.classList[i];
      }
      console.log(this.dataSource);
    });
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
