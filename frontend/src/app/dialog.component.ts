import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.dataSource);
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