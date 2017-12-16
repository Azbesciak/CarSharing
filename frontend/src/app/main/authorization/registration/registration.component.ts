import {Component, Input, OnInit} from '@angular/core';
import {Form, NgForm} from "@angular/forms";
import {DataService} from "../../../functional/data/data.service";
import {User} from "../user";

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

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  register() {
    this.data.registerUser(this.user).then(re => console.log(re));
  }

}
