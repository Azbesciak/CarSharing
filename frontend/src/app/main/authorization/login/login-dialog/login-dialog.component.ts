import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LoginDialogData) { }

  ngOnInit() {
  }

  closeDialog(res = false) {
    this.dialogRef.close(res);
  }

  onAuthResult(event) {
    if (event && event.user) {
      this.closeDialog(event);
      this.data.callback()
    }
  }
}

export class LoginDialogData {
  constructor(public message: string = null,
              public headerStyle: any = null,
              public callback: () => void = () => {}
              ){}
}
