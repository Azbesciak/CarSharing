import {Component, Input, OnInit} from '@angular/core';
import {UserSimpleData} from "../../../functional/route/route-search/route-search-result";
import {getAge} from "../../../functional/form-utils/utils";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {

  @Input()
  user: UserSimpleData;

  age: number;
  constructor() { }

  ngOnInit() {
    this.age = getAge(this.user.dateOfBirth);
  }

}
