import { Component, OnInit } from '@angular/core';
import {ErrorMatcher} from "../../../../functional/form-utils/error-matcher";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../authorization/user.service";
import {DataService} from "../../../../functional/data/data.service";
import {AppUser} from "../../../authorization/user";
import {AppUserModificator} from "../app-user-modificator";
import {Router} from "@angular/router";
import {RoutingConstants} from "../../../../functional/routing/routing.constants";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent extends AppUserModificator implements OnInit {

  basic: FormGroup;
  matcher;
  dates = {
    min: new Date(1900, 0, 1),
    max: new Date()
  };
  constructor(private auth: UserService,
              private router: Router,
              private fb: FormBuilder) {super()}

  ngOnInit() {
    this.basic = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern("\\d{9}")]],
      dateOfBirth: [this.user.dateOfBirth ? new Date(this.user.dateOfBirth) : null],
    });
    this.matcher = new ErrorMatcher();
  }

  onCompleted({value, valid}: {value: AppUser, valid: boolean}):boolean {
    if (valid) {
      this.user.lastName = value.lastName;
      this.user.firstName = value.firstName;
      this.user.phoneNumber = value.phoneNumber;
      this.user.dateOfBirth = value.dateOfBirth;
      this.sub.next(this.user);
      if (!value.cars || value.cars.length == 0) {
        this.router.navigate([RoutingConstants.getAddCarsPage()]);
        return false;
      } else {
        return true;
      }
    }
    return false;
  }
}
