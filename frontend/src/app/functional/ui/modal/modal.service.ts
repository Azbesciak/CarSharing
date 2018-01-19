import { Injectable } from '@angular/core';
import {InfoDialogComponent, InfoDialogData} from "../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material";

@Injectable()
export class ModalService {

  constructor(private dialog: MatDialog) { }

  show(data: InfoDialogData, width: string = '250px') {
    this.dialog.open(InfoDialogComponent, {
      width: width,
      data: data
    });
  }

}
