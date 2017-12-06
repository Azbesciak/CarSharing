import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../data/data.service";
import {User} from "../user";

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
    this.data.loginUser(new User(this.login, this.password))
  }

  getUsers() {
    this.data.getUsers()
      .then((users: User[]) => this.users = users)
  }
}
