import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppUser, User} from "../../user";
import {NgForm} from "@angular/forms";
import {UserService} from "../../user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input()
  form: NgForm;

  @Input()
  login: string = "lama";

  @Input()
  password: string = "123";

  error: string;

  @Output()
  authResp = new EventEmitter<AppUser | HttpErrorResponse>();

  constructor(private auth: UserService) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.login(new User(this.login, this.password))
      .then((res: AppUser) => this.authResp.emit(res))
      .catch(() => this.error = `Invalid login or password`)
  }
}
