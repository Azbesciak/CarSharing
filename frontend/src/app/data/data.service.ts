import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment"
import {User} from "../authorization/user";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  loginUser(user: User) {
    let objectObservable = this.http.post(DataService.toApi("login"), user);
    return objectObservable.toPromise()
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
