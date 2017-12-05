import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment as env } from "../../environments/environment"
import {User} from "../authorization/user";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  loginUser(user: User) {
    return this.http.post(DataService.toApi("login"), user).toPromise()
  }

  registerUser(user: User) {
    return this.http.post(DataService.toApi("register"), user).toPromise()
      .catch(e => console.log(e))
  }

  getRoles() : Promise<any> {
    return this.http.get(DataService.toApi("roles"))
      .toPromise()
  }

  blabla(): Promise<any> {
    return this.http.get("http://localhost:8080/login")
      .toPromise()
  }

  static toApi(url: string): string {
    return `${env.apiRoot}/${url}`
  }

}
