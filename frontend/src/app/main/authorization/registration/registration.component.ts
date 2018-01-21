import {Component, Input, OnInit} from '@angular/core';
import {Form, NgForm} from "@angular/forms";
import {DataService} from "../../../functional/data/data.service";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @Input()
  form: NgForm;

  @Input()
  user: User = new User("lama", "123", "123");

  constructor(
    private data: DataService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    this.data.registerUser(this.user)
      .then(() => this.userService.login(this.user));
  }

}
