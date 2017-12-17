import { Component, OnInit } from '@angular/core';
import {ErrorMatcher} from "../../../functional/form-utils/error-matcher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../authorization/user.service";
import {DataService} from "../../../functional/data/data.service";
import {AppUser} from "../../authorization/user";

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss'],
})
export class CompletionComponent implements OnInit {
  completion: FormGroup;
  matcher;
  user: AppUser;
  dates = {
    min: new Date(1900, 0, 1),
    max: new Date()
  };
  constructor(private auth: UserService, private fb: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.user = this.auth.getAuthorizedUser();
    this.completion = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, Validators.pattern("\\d{9}")],
      dateOfBirth: [ this.user.dateOfBirth ? new Date(this.user.dateOfBirth) : null],

    });
    this.matcher = new ErrorMatcher();
  }

  completeUserData({value, valid}: {value: AppUser, valid: boolean}) {
    if (valid) {
      value.user = this.user.user;
      debugger;
      this.data
        .completeUserData(value)
        .then(async() => await this.auth.getUserData())
        .then(e => console.log(e));
    }
  }

}
