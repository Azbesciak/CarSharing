import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../../functional/data/data.service";
import {User} from "../user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onAuthResult(event) {
    console.log(event)
  }
}
