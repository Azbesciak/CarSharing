import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment"
import {AppUser, User} from "../../main/authorization/user";
import { Route } from "../route/route";

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

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

  getLoggedInUserData() {
    return this.http.get(DataService.toApi("user/data")).toPromise()
  }

  completeUserData(user: AppUser) {
    return this.http.post(DataService.toApi("user/update"), user).toPromise()
  }

  searchRoute(route: Route) {
    return this.http.get(DataService.toApi(
      `routes/${route.origin.label}/${route.destination.label}/${route.departureDate.getTime()}`
    )).toPromise();
  }

  getAllCarTypes() {
    return this.http.get(DataService.toApi('cars/types')).toPromise();
  }

  static toApi(url: string): string {
    return `${env.apiRoot}/${url}`
  }

}
