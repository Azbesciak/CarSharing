import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppUser, User} from "../../user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMatcher} from "../../../../functional/form-utils/error-matcher";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  creds: FormGroup;
  matcher;
  error: string;
  errorTime: number;

  @Output()
  authResp = new EventEmitter<AppUser | HttpErrorResponse>();

  constructor(private auth: UserService, private fb: FormBuilder) {
  }

  ngOnInit() {
    let wrongCredsValidator = () => this.error ? {'creds': true} : null;
    this.creds = this.fb.group({
      login: ['lama', [Validators.required, wrongCredsValidator]],
      password: ['123', [Validators.required, wrongCredsValidator]]
    });
    this.matcher = new ErrorMatcher();
    this.forAllControls(c => {
      c.valueChanges.subscribe(() => {
        if (this.error && this.errorTime + 500 < new Date().getTime()) {
          this.error = null;
          this.validateAll();
        }
      })
    });
  }

  loginUser({value, valid}: { value: User, valid: boolean }) {
    if (valid) {
      this.auth.login(new User(value.login, value.password))
        .then((res: AppUser) => this.authResp.emit(res))
        .catch(() => {
          this.error = `Invalid login or password`;
          this.errorTime = new Date().getTime();
          this.validateAll();
        })
    }
  }

  private validateAll() {
    this.forAllControls(c => c.updateValueAndValidity());
  }

  private forAllControls(fun: Function) {
    const controls = this.creds.controls;
    Object.keys(controls).forEach(c => fun(controls[c]))
  }
}
