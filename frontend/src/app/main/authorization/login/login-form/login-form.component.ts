import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../user";
import {NgForm} from "@angular/forms";
import {LoginService} from "../../login.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input()
  form: NgForm;

  @Input()
  login: string;

  @Input()
  password: string;

  @Output()
  authResp = new EventEmitter<any>();

  constructor(private auth: LoginService) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.login(new User(this.login, this.password))
      .then(res => this.authResp.emit(res))
      .catch(e => this.authResp.emit(e))
  }
}
