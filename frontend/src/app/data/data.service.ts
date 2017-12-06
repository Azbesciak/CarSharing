import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../environments/environment"
import {User} from "../authorization/user";
import {AuthService} from "../authorization/auth.service";

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  loginUser(user: User) {
    return this.http.post(
        DataService.toApi("login"),
        user, {responseType: 'text', observe: 'response'})
      .toPromise()
      .then(r => this.auth.saveAuthorization(r))
  }

  registerUser(user: User) {
    return this.http.post(DataService.toApi("register"), user).toPromise()
      .catch(e => console.log(e))
  }

  getUsers() {
    return this.http.get(DataService.toApi("users")).toPromise()
  }

  static toApi(url: string): string {
    return `${env.apiRoot}/${url}`
  }

}
