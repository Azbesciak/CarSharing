import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../data/data.service";
import {User} from "../user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  form: NgForm;

  @Input()
  login: string;

  @Input()
  password: string;

  users: User[];

  constructor(private data: DataService) {
  }

  ngOnInit() {
  }

  loginUser() {
    this.data
      .loginUser(new User(this.login, this.password))
      // .then(r => console.log(r))
      // .catch((e: HttpErrorResponse) => {
      //   debugger;
      // console.log(e.headers);}
      // )
  }

  getUsers() {
    this.data.getUsers()
      .then((users: User[]) => this.users = users)
      .catch(e => console.log(e));
  }
}
