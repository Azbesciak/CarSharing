import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment"
import {User} from "../../main/authorization/user";
import {AuthService} from "../../main/authorization/auth.service";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  loginUser(user: User) {
    return this.http.post(
        DataService.toApi("login"),
        user, {responseType: 'text', observe: 'response'})
      .toPromise()
  }

  registerUser(user: User) {
    return this.http.post(DataService.toApi("register"), user).toPromise()
      .catch(e => console.log(e))
  }

  getLogedInUserData() {
    return this.http.get(DataService.toApi("user/data")).toPromise()
  }

  static toApi(url: string): string {
    return `${env.apiRoot}/${url}`
  }

}
