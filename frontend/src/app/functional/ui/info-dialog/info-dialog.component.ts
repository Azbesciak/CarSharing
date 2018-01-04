import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-route-added',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InfoDialogData) {
  }

  ngOnInit() {
  }

  closeDialog(res = false) {
    this.dialogRef.close(res);
    this.data.onClose(res)
  }

}

export class InfoDialogData {
  constructor(public type: InfoDialogType,
              public onClose: (res: any) => void,
              public title: string,
              public content: string) {
  }
}

export enum InfoDialogType {
  INFO, ERROR, SUCCESS
}
