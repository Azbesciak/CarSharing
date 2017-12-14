import { Injectable } from '@angular/core';
import {DataService} from "../../functional/data/data.service";
import {AuthService} from "./auth.service";
import {User} from "./user";

@Injectable()
export class LoginService {

  constructor(private data: DataService, private auth: AuthService) { }


  login(user: User) {
    return this.data.loginUser(user)
      .then(res => this.auth.saveAuthorization(res))
      .then(() => this.data.getLogedInUserData())
  }

  logout() {
    return this.auth.clearAuthorization();
  }
}
