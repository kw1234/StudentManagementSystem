import { Component, Inject } from '@angular/core';
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
  classList: string[];
  name: string;

  constructor(public dialog: MatDialog) {
    this.name = 'laaaa';
    this.classList = ['', '', '', '', '', '', '', ''];
  }

  onInit() {
    this.name = 'laaaa';
  }

  openDialog(): void {
    console.log(this.name);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, classList: this.classList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.classList = result;
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
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
